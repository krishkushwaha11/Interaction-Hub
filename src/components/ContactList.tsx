
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contact, ContactStatus } from '@/store/contactStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User, Mail, Phone, Building, MoreVertical, Calendar } from 'lucide-react';

interface ContactListProps {
  contacts: Contact[];
  onDelete: (id: string) => void;
}

const statusColors: Record<ContactStatus, string> = {
  active: 'bg-green-500',
  inactive: 'bg-gray-500',
  lead: 'bg-blue-500',
  client: 'bg-purple-500',
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
};

const ContactList: React.FC<ContactListProps> = ({ contacts, onDelete }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const navigate = useNavigate();

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const matchesSearch = 
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.email.toLowerCase().includes(search.toLowerCase()) ||
        contact.company?.toLowerCase().includes(search.toLowerCase()) ||
        contact.phone.includes(search);
        
      const matchesStatus = 
        statusFilter === "all" || contact.status === statusFilter;
        
      return matchesSearch && matchesStatus;
    });
  }, [contacts, search, statusFilter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
            aria-label="Search contacts"
          />
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-full sm:w-[180px]" aria-label="Filter by status">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="lead">Lead</SelectItem>
            <SelectItem value="client">Client</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          onClick={() => navigate('/contacts/new')}
          className="w-full sm:w-auto"
          aria-label="Add Contact"
        >
          Add Contact
        </Button>
      </div>
      
      {filteredContacts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No contacts found. Try adjusting your filters or add a new contact.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="contact-card fade-in">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-medium">{contact.name}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="Contact options">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/contacts/${contact.id}`)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/contacts/${contact.id}/edit`)}>
                        Edit Contact
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => onDelete(contact.id)}
                      >
                        Delete Contact
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center">
                  <Badge className={statusColors[contact.status]}>
                    {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                  </Badge>
                </div>
                <CardDescription className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  Added {formatDate(contact.createdAt)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-1">
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{contact.email}</span>
                  </div>
                  {contact.phone && (
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{contact.phone}</span>
                    </div>
                  )}
                  {contact.company && (
                    <div className="flex items-center">
                      <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {contact.company}
                        {contact.position && ` • ${contact.position}`}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-1">
                <div className="w-full flex flex-wrap gap-1">
                  {contact.tags.map((tag) => (
                    <Badge variant="outline" key={tag} className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
