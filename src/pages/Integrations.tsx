import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {
  CreditCard,
  Building2,
  Mail,
  MessageCircle,
  Facebook,
  Instagram,
  Truck,
  PackageSearch,
  Globe,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';

// Define the type for individual integrations
interface Integration {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  status: 'Connected' | 'Not Connected' | 'Error';
  category: string;
  color: string;
}

// Define the type for the integrations object
interface Integrations {
  [key: string]: Integration[];
}

export default function Integrations() {
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const integrations: Integrations = {
    payments: [
      {
        id: 'stripe',
        name: 'Stripe',
        description: 'Accept credit card payments globally',
        icon: <CreditCard className="h-6 w-6 text-white" />,
        status: 'Connected',
        category: 'payment',
        color: 'bg-blue-600',
      },
      {
        id: 'bank',
        name: 'Bank Transfer',
        description: 'Direct bank transfer payments',
        icon: <Building2 className="h-6 w-6 text-white" />,
        status: 'Not Connected',
        category: 'payment',
        color: 'bg-blue-600',
      }
    ],
    marketing: [
      {
        id: 'mailchimp',
        name: 'Mailchimp',
        description: 'Email marketing automation',
        icon: <Mail className="h-6 w-6 text-white" />,
        status: 'Not Connected',
        category: 'email',
        color: 'bg-green-600',
      },
      {
        id: 'sendgrid',
        name: 'SendGrid',
        description: 'Transactional email service',
        icon: <Mail className="h-6 w-6 text-white" />,
        status: 'Connected',
        category: 'email',
        color: 'bg-green-600',
      },
    ],
    social: [
      {
        id: 'whatsapp',
        name: 'WhatsApp Business',
        description: 'Customer communication via WhatsApp',
        icon: <MessageCircle className="h-6 w-6 text-white" />,
        status: 'Not Connected',
        category: 'messaging',
        color: 'bg-purple-600',
      },
      {
        id: 'facebook',
        name: 'Facebook',
        description: 'Social media integration',
        icon: <Facebook className="h-6 w-6 text-white" />,
        status: 'Not Connected',
        category: 'social',
        color: 'bg-purple-600',
      },
      {
        id: 'instagram',
        name: 'Instagram',
        description: 'Visual social commerce',
        icon: <Instagram className="h-6 w-6 text-white" />,
        status: 'Connected',
        category: 'social',
        color: 'bg-purple-600',
      },
    ],
    shipping: [
      {
        id: 'fedex',
        name: 'FedEx',
        description: 'Shipping and tracking integration',
        icon: <Truck className="h-6 w-6 text-white" />,
        status: 'Not Connected',
        category: 'shipping',
        color: 'bg-orange-600',
      },
      {
        id: 'dhl',
        name: 'DHL Express',
        description: 'International shipping solutions',
        icon: <PackageSearch className="h-6 w-6 text-white" />,
        status: 'Not Connected',
        category: 'shipping',
        color: 'bg-orange-600',
      },
    ],
    analytics: [
      {
        id: 'google-analytics',
        name: 'Google Analytics',
        description: 'Website traffic and conversion tracking',
        icon: <Globe className="h-6 w-6 text-white" />,
        status: 'Connected',
        category: 'analytics',
        color: 'bg-teal-600',
      },
    ],
    support: [
      {
        id: 'zendesk',
        name: 'Zendesk',
        description: 'Customer support platform',
        icon: <MessageSquare className="h-6 w-6 text-white" />,
        status: 'Not Connected',
        category: 'support',
        color: 'bg-red-600',
      },
    ],
  };

  const handleIntegrationClick = (integration: Integration) => {
    setSelectedIntegration(integration);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status: Integration['status']) => {
    const colors = {
      'Connected': 'bg-green-100 text-green-800',
      'Not Connected': 'bg-gray-100 text-gray-800',
      'Error': 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const renderIntegrationSection = (title: string, items: Integration[]) => (
    <div className="space-y-4 p-4 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((integration) => (
          <Card 
            key={integration.id}
            className={`hover:shadow-lg transition-shadow cursor-pointer rounded-lg border border-gray-200`} // Removed max-width
            onClick={() => handleIntegrationClick(integration)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`${integration.color} p-2 rounded-full`}>
                    {integration.icon}
                  </div>
                  <div>
                    <CardTitle>{integration.name}</CardTitle>
                    <CardDescription>{integration.description}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <Badge className={getStatusBadge(integration.status)}>
                  {integration.status}
                </Badge>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 space-y-8 bg-gray-50 min-h-screen mx-auto flex flex-col items-start">
      <div className="flex flex-col md:flex-row justify-between items-center bg-blue-600 text-white p-4 rounded-lg w-full">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold">Integrations</h1>
          <p className="text-gray-200 mt-2">Connect your favorite tools and services</p>
        </div>
        <Button className="bg-yellow-400 text-gray-900 flex-shrink-0">
          <AlertCircle className="mr-2 h-4 w-4" />
          Check Integration Status
        </Button>
      </div>
  
      {/* Integration Sections */}
      {renderIntegrationSection('Payment Processing', integrations.payments)}
      {renderIntegrationSection('Marketing & Email', integrations.marketing)}
      {renderIntegrationSection('Social Media & Messaging', integrations.social)}
      {renderIntegrationSection('Shipping & Logistics', integrations.shipping)}
      {renderIntegrationSection('Analytics', integrations.analytics)}
      {renderIntegrationSection('Customer Support', integrations.support)}
  
      {/* Integration Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white rounded-lg shadow-lg">
          {selectedIntegration && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedIntegration.icon}
                  {selectedIntegration.name} Integration
                </DialogTitle>
                <DialogDescription>
                  Configure your {selectedIntegration.name} integration settings
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">Enable Integration</h4>
                    <p className="text-sm text-gray-500">
                      Turn on/off this integration
                    </p>
                  </div>
                  <Switch className='' />
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">API Credentials</h4>
                  <Input placeholder="API Key" type="password" />
                  <Input placeholder="API Secret" type="password" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Webhook URL</h4>
                  <Input value="https://your-domain.com/webhooks/integration" readOnly />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button>Save Changes</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}