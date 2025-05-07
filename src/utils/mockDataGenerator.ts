
import { Contact, ContactStatus, Interaction } from '@/store/contactStore';

export const generateMockContacts = (count: number = 15): Contact[] => {
  const statuses: ContactStatus[] = ['active', 'inactive', 'lead', 'client'];
  const companies = ['Acme Inc.', 'TechCorp', 'Globex', 'Initech', 'Massive Dynamic', 'Stark Industries'];
  const positions = ['CEO', 'CTO', 'Marketing Manager', 'Sales Director', 'Developer', 'Product Manager'];
  const tags = ['important', 'prospect', 'tech', 'finance', 'healthcare', 'retail', 'follow-up', 'new'];

  return Array.from({ length: count }).map((_, index) => {
    const firstName = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Lisa'][Math.floor(Math.random() * 8)];
    const lastName = ['Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Miller', 'Jones', 'Taylor'][Math.floor(Math.random() * 8)];
    const name = `${firstName} ${lastName}`;
    
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 60));
    
    const updatedDate = new Date(createdDate);
    updatedDate.setDate(updatedDate.getDate() + Math.floor(Math.random() * 30));
    
    const randomTags = [];
    const tagCount = Math.floor(Math.random() * 3);
    for (let i = 0; i < tagCount; i++) {
      const randomTag = tags[Math.floor(Math.random() * tags.length)];
      if (!randomTags.includes(randomTag)) {
        randomTags.push(randomTag);
      }
    }

    return {
      id: `mock-${index + 1}`,
      name,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      company: Math.random() > 0.3 ? companies[Math.floor(Math.random() * companies.length)] : undefined,
      position: Math.random() > 0.4 ? positions[Math.floor(Math.random() * positions.length)] : undefined,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      notes: Math.random() > 0.5 ? `Notes about ${firstName}...` : undefined,
      tags: randomTags,
      createdAt: createdDate.toISOString(),
      updatedAt: updatedDate.toISOString(),
    };
  });
};

export const generateMockInteractions = (contacts: Contact[]): Interaction[] => {
  const interactionTypes = ['email', 'call', 'meeting', 'note'] as const;
  const interactions: Interaction[] = [];
  
  contacts.forEach(contact => {
    const interactionCount = Math.floor(Math.random() * 5);
    
    for (let i = 0; i < interactionCount; i++) {
      const date = new Date(contact.createdAt);
      date.setDate(date.getDate() + Math.floor(Math.random() * 30));
      
      const type = interactionTypes[Math.floor(Math.random() * interactionTypes.length)];
      let notes = '';
      
      switch (type) {
        case 'email':
          notes = `Sent follow-up email to ${contact.name} regarding the proposal.`;
          break;
        case 'call':
          notes = `Called ${contact.name} to discuss the new service offerings.`;
          break;
        case 'meeting':
          notes = `Met with ${contact.name} to present the quarterly results.`;
          break;
        case 'note':
          notes = `Added a reminder to follow up with ${contact.name} next week.`;
          break;
      }
      
      interactions.push({
        id: `mock-interaction-${contact.id}-${i}`,
        contactId: contact.id,
        date: date.toISOString().split('T')[0],
        type,
        notes,
      });
    }
  });
  
  return interactions;
};

export const setupMockData = () => {
  // Check if we've already added mock data
  const hasMockData = localStorage.getItem('crm-mock-data-added');
  
  if (hasMockData === 'true') {
    return;
  }
  
  const mockContacts = generateMockContacts();
  const mockInteractions = generateMockInteractions(mockContacts);
  
  // Get existing store data
  const storeData = localStorage.getItem('contact-store');
  let parsedData = storeData ? JSON.parse(storeData) : { state: { contacts: [], interactions: [] } };
  
  // Only add mock data if the store is empty
  if (parsedData.state.contacts.length === 0) {
    parsedData.state.contacts = mockContacts;
    parsedData.state.interactions = mockInteractions;
    
    localStorage.setItem('contact-store', JSON.stringify(parsedData));
    localStorage.setItem('crm-mock-data-added', 'true');
  }
};
