
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import ContactList from '@/components/ContactList';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog';
import useContactStore from '@/store/contactStore';

const ContactsPage = () => {
  const { contacts, deleteContact } = useContactStore();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    document.title = 'Touchpoint CRM | Contacts';
  }, []);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteContact(deleteId);
      toast.success('Contact deleted successfully');
      setIsDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
      </div>
      
      <ContactList contacts={contacts} onDelete={handleDeleteClick} />
      
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Contact"
        description="Are you sure you want to delete this contact? This action cannot be undone and all associated data will be permanently removed."
      />
    </div>
  );
};

export default ContactsPage;
