
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import InteractionList from '@/components/InteractionList';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog';
import useContactStore, { Interaction } from '@/store/contactStore';
import { Mail, Phone, Building, ArrowLeft, Edit, Trash2, User } from 'lucide-react';

const ContactDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    contacts, 
    deleteContact, 
    addInteraction, 
    updateInteraction, 
    deleteInteraction, 
    getContactInteractions 
  } = useContactStore();
  
  const contact = contacts.find((c) => c.id === id);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  useEffect(() => {
    if (!contact) {
      toast.error('Contact not found');
      navigate('/contacts');
      return;
    }
    
    document.title = `${contact.name} | Touchpoint CRM`;
    setInteractions(getContactInteractions(id!));
  }, [contact, id, getContactInteractions, navigate]);
  
  if (!contact) {
    return null; // Navigate is handled in useEffect
  }
  
  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };
  
  const handleConfirmDelete = () => {
    deleteContact(id!);
    toast.success('Contact deleted successfully');
    setIsDeleteDialogOpen(false);
    navigate('/contacts');
  };
  
  const handleAddInteraction = (interactionData: Omit<Interaction, 'id'>) => {
    addInteraction(interactionData);
    toast.success('Interaction added successfully');
    setInteractions(getContactInteractions(id!));
  };
  
  const handleUpdateInteraction = (interactionId: string, interactionData: Partial<Interaction>) => {
    updateInteraction(interactionId, interactionData);
    toast.success('Interaction updated successfully');
    setInteractions(getContactInteractions(id!));
  };
  
  const handleDeleteInteraction = (interactionId: string) => {
    deleteInteraction(interactionId);
    toast.success('Interaction deleted successfully');
    setInteractions(getContactInteractions(id!));
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('/contacts')}
            aria-label="Go back to contacts"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{contact.name}</h1>
          <Badge className="ml-2">{contact.status}</Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="gap-1"
            onClick={() => navigate(`/contacts/${id}/edit`)}
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Button>
          <Button 
            variant="destructive" 
            className="gap-1"
            onClick={handleDeleteClick}
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Added on {formatDate(contact.createdAt)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="size-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">{contact.name}</p>
                {contact.position && <p className="text-sm text-muted-foreground">{contact.position}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${contact.email}`} className="text-sm hover:underline">
                  {contact.email}
                </a>
              </div>
              
              {contact.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${contact.phone}`} className="text-sm hover:underline">
                    {contact.phone}
                  </a>
                </div>
              )}
              
              {contact.company && (
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{contact.company}</span>
                </div>
              )}
            </div>
            
            {contact.tags.length > 0 && (
              <div className="space-y-1">
                <p className="text-sm font-medium">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {contact.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {contact.notes && (
              <div className="space-y-1">
                <p className="text-sm font-medium">Notes</p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {contact.notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <InteractionList
              contactId={id!}
              interactions={interactions}
              onAddInteraction={handleAddInteraction}
              onUpdateInteraction={handleUpdateInteraction}
              onDeleteInteraction={handleDeleteInteraction}
            />
          </CardContent>
        </Card>
      </div>
      
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Contact"
        description="Are you sure you want to delete this contact? This action cannot be undone and all associated data will be permanently removed."
      />
    </div>
  );
};

export default ContactDetailPage;
