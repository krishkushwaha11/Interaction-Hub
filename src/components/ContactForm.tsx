
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contact, ContactStatus } from '@/store/contactStore';
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
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { toast } from 'sonner';

interface ContactFormProps {
  initialContact?: Contact;
  onSubmit: (contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'> | Partial<Contact>) => void;
  isEditing?: boolean;
}

const defaultContact = {
  name: '',
  email: '',
  phone: '',
  company: '',
  position: '',
  status: 'lead' as ContactStatus,
  notes: '',
  tags: [],
};

const ContactForm: React.FC<ContactFormProps> = ({ 
  initialContact, 
  onSubmit, 
  isEditing = false 
}) => {
  const [contact, setContact] = useState<Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>>({
    ...defaultContact,
    ...initialContact,
  });
  const [tagInput, setTagInput] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setContact((prev) => ({ ...prev, status: value as ContactStatus }));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!contact.tags.includes(tagInput.trim())) {
        setContact((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setContact((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (!contact.name.trim()) {
      toast.error('Name is required');
      return;
    }
    
    if (!contact.email.trim()) {
      toast.error('Email is required');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    onSubmit(contact);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Contact' : 'New Contact'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name*</Label>
              <Input
                id="name"
                name="name"
                value={contact.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={contact.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={contact.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={contact.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={contact.company || ''}
                onChange={handleChange}
                placeholder="Company name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                name="position"
                value={contact.position || ''}
                onChange={handleChange}
                placeholder="Job title"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {contact.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => removeTag(tag)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {tag} tag</span>
                  </Button>
                </Badge>
              ))}
            </div>
            <Input
              id="tagInput"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Add tags (press Enter to add)"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={contact.notes || ''}
              onChange={handleChange}
              placeholder="Add notes about this contact"
              rows={4}
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? 'Update Contact' : 'Create Contact'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ContactForm;
