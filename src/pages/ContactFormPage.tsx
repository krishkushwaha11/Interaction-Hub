
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ContactForm from '@/components/ContactForm';
import useContactStore from '@/store/contactStore';

const ContactFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { contacts, addContact, updateContact } = useContactStore();
  
  const isEditing = id !== undefined && id !== 'new';
  const contact = isEditing ? contacts.find((c) => c.id === id) : undefined;
  
  useEffect(() => {
    document.title = isEditing ? 'Edit Contact | Touchpoint CRM' : 'New Contact | Touchpoint CRM';
    
    if (isEditing && !contact) {
      toast.error('Contact not found');
      navigate('/contacts');
    }
  }, [contact, id, isEditing, navigate]);
  
  const handleSubmit = (contactData: any) => {
    try {
      if (isEditing && contact) {
        updateContact(contact.id, contactData);
        toast.success('Contact updated successfully');
        navigate(`/contacts/${contact.id}`);
      } else {
        const newId = addContact(contactData);
        toast.success('Contact created successfully');
        navigate(`/contacts/${newId}`);
      }
    } catch (error) {
      console.error('Error saving contact:', error);
      toast.error('Failed to save contact. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">
        {isEditing ? 'Edit Contact' : 'New Contact'}
      </h1>
      
      <ContactForm
        initialContact={contact}
        onSubmit={handleSubmit}
        isEditing={isEditing}
      />
    </div>
  );
};

export default ContactFormPage;
