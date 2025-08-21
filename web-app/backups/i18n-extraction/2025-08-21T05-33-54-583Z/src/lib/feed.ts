// Mock service for LusoFeed operations
export class FeedService {
  // Get all feed posts
  static async getPosts(limit: number = 10, offset: number = 0) {
    try {
      const response = await fetch(`/api/feed?limit=${limit}&offset=${offset}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching feed posts:', error)
      return { posts: [], total: 0, hasNext: false }
    }
  }

  // Create a new feed post
  static async createPost(postData: any) {
    try {
      const response = await fetch('/api/feed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error creating feed post:', error)
      return null
    }
  }

  // Like a feed post
  static async likePost(postId: string) {
    try {
      const response = await fetch(`/api/feed/${postId}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'like' }),
      })
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error liking feed post:', error)
      return null
    }
  }

  // Get user's feed activity (liked posts, comments, etc.)
  static async getUserActivity(userId: string) {
    // In a real implementation, this would fetch user-specific feed data
    return {
      likedPosts: [],
      commentedPosts: [],
      sharedPosts: [],
      createdPosts: []
    }
  }

  // Search feed posts
  static async searchPosts(query: string, filters: any = {}) {
    // In a real implementation, this would search through posts
    return {
      posts: [],
      total: 0,
      hasNext: false
    }
  }

  // Get trending hashtags
  static async getTrendingHashtags() {
    // Mock trending hashtags
    return [
      { tag: 'LusoTown', count: 124 },
      { tag: 'Portugal', count: 89 },
      { tag: 'Brazil', count: 76 },
      { tag: 'Angola', count: 63 },
      { tag: 'Mozambique', count: 52 },
      { tag: 'Fado', count: 48 },
      { tag: 'Pastelaria', count: 41 },
      { tag: 'Community', count: 37 }
    ]
  }
}

// Mock service for Favorites operations
export class FavoritesService {
  // Get user's favorites
  static async getUserFavorites(userId: string) {
    try {
      const response = await fetch(`/api/favorites?userId=${userId}`)
      const data = await response.json()
      return data.favorites || []
    } catch (error) {
      console.error('Error fetching user favorites:', error)
      return []
    }
  }

  // Add item to favorites
  static async addToFavorites(userId: string, item: any) {
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, item }),
      })
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error adding to favorites:', error)
      return { success: false, error: 'Failed to add to favorites' }
    }
  }

  // Remove item from favorites
  static async removeFromFavorites(userId: string, itemId: string) {
    try {
      const response = await fetch(`/api/favorites/${itemId}?userId=${userId}`, {
        method: 'DELETE',
      })
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error removing from favorites:', error)
      return { success: false, error: 'Failed to remove from favorites' }
    }
  }

  // Toggle favorite status
  static async toggleFavorite(userId: string, item: any) {
    const currentFavorites = await this.getUserFavorites(userId)
    const isFavorite = currentFavorites.some((fav: any) => fav.id === item.id)
    
    if (isFavorite) {
      return await this.removeFromFavorites(userId, item.id)
    } else {
      return await this.addToFavorites(userId, item)
    }
  }
}