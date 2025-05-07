
import { useState } from 'react';
import { Interaction } from '@/store/contactStore';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar, Mail, Phone, UserRound, MoreVertical, FileText } from 'lucide-react';
import InteractionForm from './InteractionForm';

interface InteractionListProps {
  contactId: string;
  interactions: Interaction[];
  onAddInteraction: (interaction: Omit<Interaction, 'id'>) => void;
  onUpdateInteraction: (id: string, interaction: Partial<Interaction>) => void;
  onDeleteInteraction: (id: string) => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
};

const InteractionIcon = ({ type }: { type: Interaction['type'] }) => {
  switch (type) {
    case 'email':
      return <Mail className="h-4 w-4" />;
    case 'call':
      return <Phone className="h-4 w-4" />;
    case 'meeting':
      return <UserRound className="h-4 w-4" />;
    case 'note':
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const InteractionList: React.FC<InteractionListProps> = ({
  contactId,
  interactions,
  onAddInteraction,
  onUpdateInteraction,
  onDeleteInteraction,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingInteraction, setEditingInteraction] = useState<Interaction | null>(null);

  const handleAddInteraction = (interactionData: Omit<Interaction, 'id'>) => {
    onAddInteraction(interactionData);
    setShowForm(false);
  };

  const handleUpdateInteraction = (interactionData: Omit<Interaction, 'id'>) => {
    if (editingInteraction) {
      onUpdateInteraction(editingInteraction.id, interactionData);
      setEditingInteraction(null);
    }
  };

  const handleEditInteraction = (interaction: Interaction) => {
    setEditingInteraction(interaction);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingInteraction(null);
  };

  const sortedInteractions = [...interactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium">Interactions & Notes</h3>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>Add Interaction</Button>
        )}
      </div>
      
      {showForm && (
        <div className="mb-4">
          <InteractionForm
            contactId={contactId}
            initialInteraction={editingInteraction || undefined}
            onSubmit={editingInteraction ? handleUpdateInteraction : handleAddInteraction}
            onCancel={handleCancelForm}
            isEditing={!!editingInteraction}
          />
        </div>
      )}
      
      {sortedInteractions.length === 0 ? (
        <div className="text-center py-6 bg-muted rounded-lg">
          <p className="text-muted-foreground">No interactions recorded yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedInteractions.map((interaction) => (
            <Card key={interaction.id} className="fade-in">
              <CardHeader className="pb-2 flex flex-row justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-1 rounded">
                      <InteractionIcon type={interaction.type} />
                    </div>
                    <CardTitle className="text-base font-medium capitalize">
                      {interaction.type}
                    </CardTitle>
                  </div>
                  <CardDescription className="flex items-center gap-1 text-xs">
                    <Calendar className="h-3 w-3" />
                    {formatDate(interaction.date)}
                  </CardDescription>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditInteraction(interaction)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => onDeleteInteraction(interaction.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              
              <CardContent>
                <div className="whitespace-pre-wrap text-sm">
                  {interaction.notes}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default InteractionList;
