import React from 'react';

interface ThemeColors {
  primaryColor: string;
  secondaryColor: string;
}

interface SiteSettingsProps {
  siteTitle: string;
  description: string;
  themeColors: ThemeColors;
}

const SiteSettings: React.FC<SiteSettingsProps> = ({ siteTitle, description, themeColors }) => {
  return (
    <section className="mb-8">
      <h1 className="text-2xl font-bold mb-2">{siteTitle}</h1>
      <p className="mb-4">{description}</p>
      <button
        style={{
          backgroundColor: themeColors.primaryColor,
          color: themeColors.secondaryColor,
          padding: '10px 20px',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer',
        }}
      >
        Tema Renkli Buton
      </button>
    </section>
  );
};

export default SiteSettings;
