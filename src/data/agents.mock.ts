import type { Agent } from '@/domain/property';
import { siteConfig } from './site';

const agency = siteConfig.name;
const officePhone = siteConfig.contact.phoneDisplay;

export const AGENTS: readonly Agent[] = [
  {
    id: 'agent-nikola',
    name: 'Nikola Bibovski',
    role: 'Osnivač · Savetnik za nekretnine',
    phone: officePhone,
    whatsapp: '+38166272410',
    viber: '+38166272410',
    email: siteConfig.contact.email,
    agency,
  },
  {
    id: 'agent-milica',
    name: 'Milica Stojanović',
    role: 'Agent za nekretnine',
    phone: officePhone,
    whatsapp: '+38166272410',
    email: siteConfig.contact.email,
    agency,
  },
  {
    id: 'agent-stefan',
    name: 'Stefan Jovanov',
    role: 'Agent za komercijalne prostore',
    phone: officePhone,
    viber: '+38166272410',
    email: siteConfig.contact.email,
    agency,
  },
];
