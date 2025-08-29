import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { 
  SecureFileUpload,
  securityLogger,
  AuthTokenManager 
} from '@/lib/security/comprehensive-security';
import { validateInput } from '@/lib/security/input-validation';

// Initialize Supabase client
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase configuration missing');
  }
  
  return createClient(supabaseUrl, supabaseServiceKey);
}

// Secure file upload endpoint for Portuguese community
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  try {
    // Authentication check
    const supabase = getSupabaseClient();
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      await securityLogger.logSecurityEvent({
        ip,
        userAgent,
        eventType: 'UNAUTHORIZED_API_ACCESS',
        severity: 'MEDIUM',
        description: 'Unauthorized file upload attempt - missing token',
        culturalContext: 'portuguese-uk',
        metadata: { endpoint: '/api/upload/secure' }
      });
      
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      await securityLogger.logSecurityEvent({
        ip,
        userAgent,
        eventType: 'UNAUTHORIZED_API_ACCESS',
        severity: 'MEDIUM',
        description: 'Invalid authentication token for file upload',
        culturalContext: 'portuguese-uk',
        metadata: { endpoint: '/api/upload/secure' }
      });
      
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      );
    }
    
    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const uploadType = formData.get('uploadType') as string || 'profile';
    const description = formData.get('description') as string || '';
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Convert file to buffer for content validation
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Comprehensive file validation
    const fileValidation = SecureFileUpload.validateFile({
      name: file.name,
      size: file.size,
      type: file.type,
      buffer: buffer
    });
    
    if (!fileValidation.isValid) {
      await securityLogger.logSecurityEvent({
        userId: user.id,
        ip,
        userAgent,
        eventType: 'FILE_UPLOAD',
        severity: 'MEDIUM',
        description: `File upload blocked - validation failed: ${fileValidation.errors.join(', ')}`,
        culturalContext: 'portuguese-uk',
        metadata: { 
          originalFilename: file.name,
          fileSize: file.size,
          fileType: file.type,
          errors: fileValidation.errors
        }
      });
      
      return NextResponse.json(
        { 
          error: 'File validation failed',
          details: fileValidation.errors
        },
        { status: 400 }
      );
    }
    
    // Validate upload type and description
    const allowedUploadTypes = ['profile', 'business', 'event', 'document'];
    if (!allowedUploadTypes.includes(uploadType)) {
      return NextResponse.json(
        { error: 'Invalid upload type' },
        { status: 400 }
      );
    }
    
    // Validate description if provided
    if (description) {
      try {
        validateInput.message({ 
          content: description, 
          messageType: 'text',
          conversationId: '00000000-0000-0000-0000-000000000000', // Placeholder
          receiverId: user.id 
        });
      } catch (error) {
        return NextResponse.json(
          { error: 'Invalid description content' },
          { status: 400 }
        );
      }
    }
    
    // Generate secure filename and path
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    const secureFilename = `${crypto.randomUUID()}_${Date.now()}${fileExtension}`;
    const storagePath = `${uploadType}/${user.id}/${secureFilename}`;
    
    // Upload to Supabase Storage with security constraints
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('secure-uploads')
      .upload(storagePath, buffer, {
        contentType: file.type,
        duplex: 'half',
        upsert: false, // Prevent overwriting existing files
      });
    
    if (uploadError) {
      throw uploadError;
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('secure-uploads')
      .getPublicUrl(storagePath);
    
    // Log successful upload to audit table
    const { error: auditError } = await supabase
      .from('file_upload_audit')
      .insert([{
        user_id: user.id,
        ip_address: ip,
        original_filename: file.name,
        sanitized_filename: fileValidation.sanitizedName,
        file_size: file.size,
        file_type: file.type,
        upload_path: storagePath,
        validation_results: {
          passed: fileValidation.isValid,
          errors: fileValidation.errors
        },
        security_scan_results: {
          contentScanned: true,
          threats: []
        },
        blocked: false
      }]);
    
    if (auditError) {
      console.error('Failed to log file upload audit:', auditError);
    }
    
    // Log security event
    await securityLogger.logSecurityEvent({
      userId: user.id,
      ip,
      userAgent,
      eventType: 'FILE_UPLOAD',
      severity: 'LOW',
      description: `Successful file upload: ${fileValidation.sanitizedName}`,
      culturalContext: 'portuguese-uk',
      metadata: { 
        uploadType,
        filename: fileValidation.sanitizedName,
        fileSize: file.size,
        fileType: file.type,
        storagePath
      }
    });
    
    const executionTime = Date.now() - startTime;
    
    return NextResponse.json({
      success: true,
      data: {
        filename: fileValidation.sanitizedName,
        url: urlData.publicUrl,
        size: file.size,
        type: file.type,
        uploadType,
        uploadedAt: new Date().toISOString()
      },
      executionTime
    });
    
  } catch (error) {
    const executionTime = Date.now() - startTime;
    
    await securityLogger.logSecurityEvent({
      ip,
      userAgent,
      eventType: 'FILE_UPLOAD',
      severity: 'HIGH',
      description: `File upload error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      culturalContext: 'portuguese-uk',
      metadata: { 
        error: error instanceof Error ? error.message : 'Unknown error',
        executionTime
      }
    });
    
    console.error('Secure file upload error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'File upload failed',
        executionTime
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve user's uploaded files
export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  try {
    // Authentication check
    const supabase = getSupabaseClient();
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      );
    }
    
    // Get user's upload history from audit table
    const { data: uploads, error: uploadsError } = await supabase
      .from('file_upload_audit')
      .select(`
        id,
        original_filename,
        sanitized_filename,
        file_size,
        file_type,
        upload_path,
        created_at,
        blocked
      `)
      .eq('user_id', user.id)
      .eq('blocked', false)
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (uploadsError) {
      throw uploadsError;
    }
    
    // Generate URLs for files (if they still exist)
    const uploadsWithUrls = uploads?.map(upload => {
      const { data: urlData } = supabase.storage
        .from('secure-uploads')
        .getPublicUrl(upload.upload_path);
      
      return {
        id: upload.id,
        filename: upload.sanitized_filename,
        originalFilename: upload.original_filename,
        size: upload.file_size,
        type: upload.file_type,
        url: urlData.publicUrl,
        uploadedAt: upload.created_at
      };
    }) || [];
    
    return NextResponse.json({
      success: true,
      data: {
        uploads: uploadsWithUrls,
        total: uploads?.length || 0
      }
    });
    
  } catch (error) {
    await securityLogger.logSecurityEvent({
      ip,
      userAgent,
      eventType: 'DATA_ACCESS',
      severity: 'MEDIUM',
      description: `Error retrieving upload history: ${error instanceof Error ? error.message : 'Unknown error'}`,
      metadata: { endpoint: '/api/upload/secure' }
    });
    
    console.error('Error retrieving uploads:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to retrieve uploads'
      },
      { status: 500 }
    );
  }
}

// DELETE endpoint to remove uploaded files
export async function DELETE(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  try {
    // Authentication check
    const supabase = getSupabaseClient();
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      );
    }
    
    // Get file ID from query params
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('fileId');
    
    if (!fileId) {
      return NextResponse.json(
        { error: 'File ID required' },
        { status: 400 }
      );
    }
    
    // Get file info from audit table
    const { data: fileData, error: fileError } = await supabase
      .from('file_upload_audit')
      .select('upload_path, sanitized_filename')
      .eq('id', fileId)
      .eq('user_id', user.id) // Ensure user owns the file
      .single();
    
    if (fileError || !fileData) {
      return NextResponse.json(
        { error: 'File not found or access denied' },
        { status: 404 }
      );
    }
    
    // Delete from storage
    const { error: deleteError } = await supabase.storage
      .from('secure-uploads')
      .remove([fileData.upload_path]);
    
    if (deleteError) {
      throw deleteError;
    }
    
    // Update audit record
    await supabase
      .from('file_upload_audit')
      .update({ blocked: true, block_reason: 'User deleted' })
      .eq('id', fileId);
    
    // Log deletion
    await securityLogger.logSecurityEvent({
      userId: user.id,
      ip,
      userAgent,
      eventType: 'FILE_UPLOAD',
      severity: 'LOW',
      description: `File deleted: ${fileData.sanitized_filename}`,
      culturalContext: 'portuguese-uk',
      metadata: { 
        fileId,
        filename: fileData.sanitized_filename,
        action: 'delete'
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'File deleted successfully'
    });
    
  } catch (error) {
    await securityLogger.logSecurityEvent({
      ip,
      userAgent,
      eventType: 'FILE_UPLOAD',
      severity: 'MEDIUM',
      description: `Error deleting file: ${error instanceof Error ? error.message : 'Unknown error'}`,
      metadata: { endpoint: '/api/upload/secure' }
    });
    
    console.error('Error deleting file:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete file'
      },
      { status: 500 }
    );
  }
}