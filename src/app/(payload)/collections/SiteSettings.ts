import { GlobalConfig } from "payload";

const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
      read: () => true
  },
  fields: [
    {
      name: 'siteTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'primaryColor',
      label: 'Primary Theme Color',
      type: 'text',
    },
    {
      name: 'secondaryColor',
      label: 'Secondary Theme Color',
      type: 'text',
    },
  ],
};

export default SiteSettings;
