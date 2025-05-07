
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useContactStore from '@/store/contactStore';
import { Users, ChevronRight } from 'lucide-react';

const HomePage = () => {
  const { contacts } = useContactStore();
  
  const recentContacts = contacts
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);
  
  const contactCountByStatus = contacts.reduce(
    (acc, contact) => {
      acc[contact.status] = (acc[contact.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  useEffect(() => {
    document.title = 'Touchpoint CRM | Home';
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your contact management system.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contacts.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contacts</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contactCountByStatus.active || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads</CardTitle>
            <div className="h-4 w-4 rounded-full bg-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contactCountByStatus.lead || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <div className="h-4 w-4 rounded-full bg-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contactCountByStatus.client || 0}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Contacts</CardTitle>
            <CardDescription>
              Your most recently updated contacts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentContacts.length > 0 ? (
              recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.email}</p>
                  </div>
                  <Button asChild variant="ghost" size="icon">
                    <Link to={`/contacts/${contact.id}`}>
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">View {contact.name}</span>
                    </Link>
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-muted-foreground">
                No contacts yet. Add your first contact to get started.
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/contacts">View All Contacts</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Tips</CardTitle>
            <CardDescription>
              Get the most out of your CRM.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Add More Details</h4>
              <p className="text-sm text-muted-foreground">
                Make sure to add company information and tags to your contacts for better organization.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Record Interactions</h4>
              <p className="text-sm text-muted-foreground">
                Track every email, call, and meeting with your contacts to maintain a complete history.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Use the Search</h4>
              <p className="text-sm text-muted-foreground">
                Quickly find contacts using the search feature. It searches across names, emails, and companies.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/contacts/new">Add New Contact</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
