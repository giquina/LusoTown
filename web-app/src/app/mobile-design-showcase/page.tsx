"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input, Textarea, SearchInput } from '@/components/ui/input';
import { 
  Heading, 
  Text, 
  Label, 
  Container, 
  Section, 
  Flex, 
  Grid 
} from '@/components/ui/typography';
import { 
  PageLayout, 
  SectionLayout, 
  HeaderLayout, 
  FormLayout, 
  FieldLayout,
  ListLayout,
  ListItemLayout,
  EmptyStateLayout,
  LoadingLayout,
  SkeletonLayout
} from '@/components/ui/layout';

export default function MobileDesignShowcase() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    search: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <PageLayout mobile safeArea>
      {/* Header Section */}
      <SectionLayout mobile background="gradient" spacing="compact">
        <HeaderLayout
          title="LusoTown Mobile Design System"
          subtitle="Portuguese Cultural Mobile-First Framework Showcase"
          mobile
          level={1}
        />
      </SectionLayout>

      {/* Typography Section */}
      <SectionLayout mobile spacing="default">
        <Card variant="default" mobile>
          <CardHeader mobile>
            <CardTitle mobile>Universal Typography System</CardTitle>
          </CardHeader>
          <CardContent mobile>
            <div className="space-y-6">
              <div>
                <Heading level={1} mobile portuguese>
                  Título Principal (H1) - 28px/700
                </Heading>
                <Text variant="small" mobile portuguese>
                  Optimized for mobile page titles and main headings
                </Text>
              </div>
              
              <div>
                <Heading level={2} mobile portuguese>
                  Subtítulo Secundário (H2) - 22px/600
                </Heading>
                <Text variant="small" mobile portuguese>
                  Perfect for section headers and category titles
                </Text>
              </div>
              
              <div>
                <Heading level={3} mobile portuguese>
                  Título do Cartão (H3) - 18px/700
                </Heading>
                <Text variant="small" mobile portuguese>
                  Ideal for card titles and event names
                </Text>
              </div>
              
              <div>
                <Text variant="body" mobile portuguese>
                  Texto do corpo (Body) - 14px/400 com altura de linha 1.5. Este texto é otimizado para leitura em dispositivos móveis com considerações especiais para o texto português mais longo.
                </Text>
              </div>
              
              <div>
                <Text variant="small" mobile portuguese>
                  Texto pequeno (Small) - 12px/400 para metadados e informações secundárias
                </Text>
              </div>
              
              <div>
                <Text variant="caption" mobile portuguese>
                  LEGENDA (CAPTION) - 11px/500 PARA RÓTULOS E CATEGORIAS
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </SectionLayout>

      {/* Button System Section */}
      <SectionLayout mobile>
        <Card variant="default" mobile>
          <CardHeader mobile>
            <CardTitle mobile>Universal Button & CTA System</CardTitle>
          </CardHeader>
          <CardContent mobile>
            <div className="space-y-4">
              <div>
                <Label mobile portuguese>Primary Buttons (48px height)</Label>
                <Flex direction="column" gap="small" mobile>
                  <Button variant="primary" mobile>
                    Participar no Evento
                  </Button>
                  <Button variant="action" mobile>
                    Reservar Agora
                  </Button>
                </Flex>
              </div>
              
              <div>
                <Label mobile portuguese>Secondary Buttons (44px height)</Label>
                <Flex direction="row" gap="small" mobile>
                  <Button variant="secondary" mobile>
                    Ver Detalhes
                  </Button>
                  <Button variant="outline" mobile>
                    Cancelar
                  </Button>
                </Flex>
              </div>
              
              <div>
                <Label mobile portuguese>Cultural Heritage Buttons</Label>
                <Flex direction="column" gap="small" mobile>
                  <Button variant="portugal" mobile>
                    Eventos de Portugal
                  </Button>
                  <Button variant="brazil" mobile>
                    Eventos do Brasil
                  </Button>
                  <Button variant="palop" mobile>
                    Eventos dos PALOP
                  </Button>
                </Flex>
              </div>
              
              <div>
                <Label mobile portuguese>Small Buttons</Label>
                <Flex direction="row" gap="small" mobile>
                  <Button variant="primary" size="small" mobile>
                    Salvar
                  </Button>
                  <Button variant="secondary" size="small" mobile>
                    Editar
                  </Button>
                  <Button variant="ghost" size="icon" mobile>
                    ❤️
                  </Button>
                </Flex>
              </div>
            </div>
          </CardContent>
        </Card>
      </SectionLayout>

      {/* Form System Section */}
      <SectionLayout mobile>
        <Card variant="default" mobile>
          <CardHeader mobile>
            <CardTitle mobile>Portuguese Form System</CardTitle>
          </CardHeader>
          <CardContent mobile>
            <FormLayout spacing="default" mobile>
              <FieldLayout 
                label="Nome Completo"
                required
                mobile
              >
                <Input
                  mobile
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Digite seu nome completo"
                  size="medium"
                />
              </FieldLayout>
              
              <FieldLayout 
                label="Endereço de Email"
                help="Usaremos este email para enviar notificações sobre eventos"
                required
                mobile
              >
                <Input
                  type="email"
                  mobile
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="seuemail@exemplo.com"
                  size="medium"
                />
              </FieldLayout>
              
              <FieldLayout 
                label="Pesquisar Eventos"
                help="Digite para encontrar eventos da comunidade portuguesa"
                mobile
              >
                <SearchInput
                  mobile
                  value={formData.search}
                  onChange={(e) => setFormData(prev => ({ ...prev, search: e.target.value }))}
                  onClear={() => setFormData(prev => ({ ...prev, search: '' }))}
                  placeholder="Procurar eventos, negócios..."
                />
              </FieldLayout>
              
              <FieldLayout 
                label="Mensagem"
                help="Conte-nos sobre seus interesses na comunidade portuguesa"
                mobile
              >
                <Textarea
                  mobile
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Escreva sua mensagem aqui..."
                  rows={4}
                />
              </FieldLayout>
              
              <Flex direction="row" gap="medium" justify="between" mobile>
                <Button variant="secondary" mobile>
                  Cancelar
                </Button>
                <Button variant="primary" mobile onClick={handleSubmit}>
                  Enviar Mensagem
                </Button>
              </Flex>
            </FormLayout>
          </CardContent>
        </Card>
      </SectionLayout>

      {/* Card System Section */}
      <SectionLayout mobile>
        <Heading level={2} mobile portuguese>
          Sistema Universal de Cartões
        </Heading>
        
        <Grid columns={2} gap="medium" mobile>
          <Card variant="event" mobile>
            <CardHeader mobile>
              <CardTitle mobile>Evento Cultural</CardTitle>
            </CardHeader>
            <CardContent mobile>
              <Text variant="body" mobile portuguese>
                Noite de Fado no Centro Cultural Português de Londres
              </Text>
              <Text variant="small" mobile>
                15 de Setembro, 19:30
              </Text>
            </CardContent>
            <CardFooter mobile>
              <Button variant="primary" size="small" mobile>
                Participar
              </Button>
            </CardFooter>
          </Card>
          
          <Card variant="business" mobile>
            <CardHeader mobile>
              <CardTitle mobile>Negócio Local</CardTitle>
            </CardHeader>
            <CardContent mobile>
              <Text variant="body" mobile portuguese>
                Restaurante O Bacalhau - Cozinha Portuguesa Autêntica
              </Text>
              <Text variant="small" mobile>
                Bethnal Green, Londres
              </Text>
            </CardContent>
            <CardFooter mobile>
              <Button variant="secondary" size="small" mobile>
                Ver Menu
              </Button>
            </CardFooter>
          </Card>
          
          <Card variant="match" mobile>
            <CardHeader mobile>
              <CardTitle mobile>Conexão Cultural</CardTitle>
            </CardHeader>
            <CardContent mobile>
              <Text variant="body" mobile portuguese>
                Maria S. - Compatibilidade 92%
              </Text>
              <Text variant="small" mobile>
                Interesses: Futebol, História, Culinária
              </Text>
            </CardContent>
            <CardFooter mobile>
              <Button variant="action" size="small" mobile>
                Conectar
              </Button>
            </CardFooter>
          </Card>
          
          <Card variant="premium" mobile>
            <CardHeader mobile>
              <CardTitle mobile>Evento Premium</CardTitle>
            </CardHeader>
            <CardContent mobile>
              <Text variant="body" mobile portuguese>
                Jantar Exclusivo com Chef Português
              </Text>
              <Text variant="small" mobile>
                Apenas para membros Premium
              </Text>
            </CardContent>
            <CardFooter mobile>
              <Button variant="primary" size="small" mobile>
                £75.00
              </Button>
            </CardFooter>
          </Card>
        </Grid>
      </SectionLayout>

      {/* Layout System Section */}
      <SectionLayout mobile>
        <Card variant="default" mobile>
          <CardHeader mobile>
            <CardTitle mobile>Sistema de Layout Responsivo</CardTitle>
          </CardHeader>
          <CardContent mobile>
            <div className="space-y-6">
              <div>
                <Label mobile portuguese>Containers Responsivos</Label>
                <div className="lusotown-container bg-gray-100 p-4 rounded-lg">
                  <Text variant="small" mobile>
                    Container móvel: 375px+ com padding 16px
                  </Text>
                </div>
              </div>
              
              <div>
                <Label mobile portuguese>Grid Responsivo</Label>
                <div className="lusotown-grid-auto gap-3">
                  <div className="bg-primary-100 p-3 rounded text-center lusotown-text-small">
                    Item 1
                  </div>
                  <div className="bg-secondary-100 p-3 rounded text-center lusotown-text-small">
                    Item 2
                  </div>
                  <div className="bg-accent-100 p-3 rounded text-center lusotown-text-small">
                    Item 3
                  </div>
                  <div className="bg-action-100 p-3 rounded text-center lusotown-text-small">
                    Item 4
                  </div>
                </div>
              </div>
              
              <div>
                <Label mobile portuguese>Espaçamento Consistente</Label>
                <div className="space-y-3">
                  <div className="bg-gray-100 lusotown-spacing-card rounded">
                    <Text variant="small" mobile>Padding de cartão: 16px</Text>
                  </div>
                  <div className="bg-gray-100 lusotown-spacing-card rounded">
                    <Text variant="small" mobile>Gap entre cartões: 12px</Text>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </SectionLayout>

      {/* Loading States Section */}
      <SectionLayout mobile>
        <Card variant="default" mobile>
          <CardHeader mobile>
            <CardTitle mobile>Estados de Carregamento</CardTitle>
          </CardHeader>
          <CardContent mobile>
            {loading ? (
              <LoadingLayout message="Enviando mensagem..." mobile />
            ) : (
              <div className="space-y-4">
                <div>
                  <Label mobile portuguese>Skeleton Loading</Label>
                  <SkeletonLayout lines={3} mobile />
                </div>
                
                <div>
                  <Label mobile portuguese>Spinner</Label>
                  <div className="flex items-center gap-3">
                    <div className="lusotown-spinner"></div>
                    <Text variant="small" mobile>Carregando...</Text>
                  </div>
                </div>
                
                <Button variant="primary" mobile onClick={() => setLoading(true)}>
                  Testar Estado de Carregamento
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </SectionLayout>

      {/* Accessibility Features Section */}
      <SectionLayout mobile>
        <Card variant="default" mobile>
          <CardHeader mobile>
            <CardTitle mobile>Recursos de Acessibilidade</CardTitle>
          </CardHeader>
          <CardContent mobile>
            <ListLayout variant="divided" mobile>
              <ListItemLayout mobile>
                <div className="w-6 h-6 bg-green-500 rounded flex-shrink-0"></div>
                <div>
                  <Text variant="body" mobile portuguese>
                    Touch targets mínimos de 44px (WCAG 2.1 AA)
                  </Text>
                  <Text variant="small" mobile>
                    Todos os botões e links atendem aos padrões de acessibilidade
                  </Text>
                </div>
              </ListItemLayout>
              
              <ListItemLayout mobile>
                <div className="w-6 h-6 bg-blue-500 rounded flex-shrink-0"></div>
                <div>
                  <Text variant="body" mobile portuguese>
                    Estados de foco visíveis
                  </Text>
                  <Text variant="small" mobile>
                    Contornos claros para navegação por teclado
                  </Text>
                </div>
              </ListItemLayout>
              
              <ListItemLayout mobile>
                <div className="w-6 h-6 bg-purple-500 rounded flex-shrink-0"></div>
                <div>
                  <Text variant="body" mobile portuguese>
                    Suporte para alto contraste
                  </Text>
                  <Text variant="small" mobile>
                    Adaptação automática para usuários com necessidades visuais
                  </Text>
                </div>
              </ListItemLayout>
              
              <ListItemLayout mobile>
                <div className="w-6 h-6 bg-orange-500 rounded flex-shrink-0"></div>
                <div>
                  <Text variant="body" mobile portuguese>
                    Movimento reduzido
                  </Text>
                  <Text variant="small" mobile>
                    Respeita preferências de movimento dos usuários
                  </Text>
                </div>
              </ListItemLayout>
            </ListLayout>
          </CardContent>
        </Card>
      </SectionLayout>

      {/* Portuguese Text Handling */}
      <SectionLayout mobile>
        <Card variant="default" mobile>
          <CardHeader mobile>
            <CardTitle mobile>Otimização para Texto Português</CardTitle>
          </CardHeader>
          <CardContent mobile>
            <div className="space-y-4">
              <div>
                <Label mobile portuguese>Texto longo automaticamente quebrado</Label>
                <Text variant="body" mobile portuguese>
                  "Participar no Evento" → 90% mais longo que "Join Event". O sistema automaticamente ajusta botões, navega­ção e formu­lários para acomodar texto português mais longo com hyphenation adequada e quebras de palavra inteligentes.
                </Text>
              </div>
              
              <div>
                <Label mobile portuguese>Navegação adaptável</Label>
                <div className="flex flex-wrap gap-2">
                  <span className="lusotown-nav-label bg-gray-100 px-3 py-1 rounded text-center">
                    Eventos
                  </span>
                  <span className="lusotown-nav-label bg-gray-100 px-3 py-1 rounded text-center">
                    Empresas
                  </span>
                  <span className="lusotown-nav-label bg-gray-100 px-3 py-1 rounded text-center">
                    Estudantes
                  </span>
                  <span className="lusotown-nav-label bg-gray-100 px-3 py-1 rounded text-center">
                    Preços
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </SectionLayout>

      {/* Mobile Breakpoints */}
      <SectionLayout mobile spacing="loose">
        <Card variant="default" mobile>
          <CardHeader mobile>
            <CardTitle mobile>Breakpoints Responsivos</CardTitle>
          </CardHeader>
          <CardContent mobile>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <Text variant="body" mobile>375px (Mobile Small)</Text>
                <Text variant="small" mobile>iPhone SE - Crítico</Text>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded">
                <Text variant="body" mobile>414px (Mobile Standard)</Text>
                <Text variant="small" mobile>Experiência móvel primária</Text>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-150 rounded">
                <Text variant="body" mobile>768px (Tablet Portrait)</Text>
                <Text variant="small" mobile>iPad - Prioridade secundária</Text>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-200 rounded">
                <Text variant="body" mobile>1024px+ (Desktop)</Text>
                <Text variant="small" mobile>Camada de aprimoramento</Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </SectionLayout>

      {/* Design System Stats */}
      <SectionLayout mobile background="gray">
        <Container mobile>
          <Grid columns={2} gap="medium" mobile>
            <div className="text-center">
              <Heading level={1} mobile>522+</Heading>
              <Text variant="small" mobile portuguese>
                Componentes Otimizados
              </Text>
            </div>
            <div className="text-center">
              <Heading level={1} mobile>100%</Heading>
              <Text variant="small" mobile portuguese>
                Compatibilidade WCAG 2.1 AA
              </Text>
            </div>
            <div className="text-center">
              <Heading level={1} mobile>4</Heading>
              <Text variant="small" mobile portuguese>
                Breakpoints Responsivos
              </Text>
            </div>
            <div className="text-center">
              <Heading level={1} mobile>44px</Heading>
              <Text variant="small" mobile portuguese>
                Touch Target Mínimo
              </Text>
            </div>
          </Grid>
        </Container>
      </SectionLayout>
    </PageLayout>
  );
}