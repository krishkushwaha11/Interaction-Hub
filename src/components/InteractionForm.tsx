
import { useState } from 'react';
import { Interaction } from '@/store/contactStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface InteractionFormProps {
  contactId: string;
  initialInteraction?: Interaction;
  onSubmit: (interactionData: Omit<Interaction, 'id'>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const InteractionForm: React.FC<InteractionFormProps> = ({
  contactId,
  initialInteraction,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const [interaction, setInteraction] = useState<Omit<Interaction, 'id'>>({
    contactId,
    date: initialInteraction?.date || getCurrentDate(),
    type: initialInteraction?.type || 'note',
    notes: initialInteraction?.notes || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInteraction((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setInteraction((prev) => ({
      ...prev,
      type: value as 'email' | 'call' | 'meeting' | 'note',
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(interaction);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Interaction' : 'Add Interaction'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={interaction.date}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={interaction.type}
                onValueChange={handleTypeChange}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="call">Call</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="note">Note</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={interaction.notes}
              onChange={handleChange}
              placeholder="Add details about this interaction"
              rows={4}
              required
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? 'Update' : 'Add'} Interaction
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default InteractionForm;
