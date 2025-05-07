
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ContactStatus = 'active' | 'inactive' | 'lead' | 'client';

export interface Interaction {
  id: string;
  contactId: string;
  date: string;
  type: 'email' | 'call' | 'meeting' | 'note';
  notes: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  status: ContactStatus;
  notes?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface ContactState {
  contacts: Contact[];
  interactions: Interaction[];
  addContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateContact: (id: string, contact: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  addInteraction: (interaction: Omit<Interaction, 'id'>) => string;
  updateInteraction: (id: string, interaction: Partial<Interaction>) => void;
  deleteInteraction: (id: string) => void;
  getContactInteractions: (contactId: string) => Interaction[];
}

const useContactStore = create<ContactState>()(
  persist(
    (set, get) => ({
      contacts: [],
      interactions: [],
      
      addContact: (contactData) => {
        const id = Date.now().toString();
        const now = new Date().toISOString();
        
        const newContact: Contact = {
          ...contactData,
          id,
          createdAt: now,
          updatedAt: now,
        };
        
        set((state) => ({
          contacts: [...state.contacts, newContact],
        }));
        
        return id;
      },
      
      updateContact: (id, contactData) => {
        set((state) => ({
          contacts: state.contacts.map((contact) =>
            contact.id === id
              ? { ...contact, ...contactData, updatedAt: new Date().toISOString() }
              : contact
          ),
        }));
      },
      
      deleteContact: (id) => {
        set((state) => ({
          contacts: state.contacts.filter((contact) => contact.id !== id),
          interactions: state.interactions.filter(
            (interaction) => interaction.contactId !== id
          ),
        }));
      },
      
      addInteraction: (interactionData) => {
        const id = Date.now().toString();
        
        const newInteraction: Interaction = {
          ...interactionData,
          id,
        };
        
        set((state) => ({
          interactions: [...state.interactions, newInteraction],
        }));
        
        return id;
      },
      
      updateInteraction: (id, interactionData) => {
        set((state) => ({
          interactions: state.interactions.map((interaction) =>
            interaction.id === id
              ? { ...interaction, ...interactionData }
              : interaction
          ),
        }));
      },
      
      deleteInteraction: (id) => {
        set((state) => ({
          interactions: state.interactions.filter(
            (interaction) => interaction.id !== id
          ),
        }));
      },
      
      getContactInteractions: (contactId) => {
        return get().interactions.filter(
          (interaction) => interaction.contactId === contactId
        );
      },
    }),
    {
      name: 'contact-store',
      version: 1,
    }
  )
);

export default useContactStore;
