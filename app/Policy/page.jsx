'use client';
import './policy.scss';
import { useTranslation } from 'react-i18next';
function PrivacyPolicy() {
  const { t } = useTranslation()
  return (
    <div className="privacy-policy">
      <h1>{t('Policy.privacy-privacy-policy-title')}</h1>
      <p className="intro">
        {t('Policy.privacy-privacy-policy-intro')}
      </p>

      <div className="section">
        <h2>{t('Policy.privacy-section-1-title')}</h2>
        <ul>
          <li>{t('Policy.privacy-section-1-content-1')}</li>
          <li>{t('Policy.privacy-section-1-content-2')}</li>
          <li>{t('Policy.privacy-section-1-content-3')}</li>
        </ul>
      </div>

      <div className="section">
        <h2>{t('Policy.privacy-section-2-title')}</h2>
        <ul>
          <li>{t('Policy.privacy-section-2-content-1')}</li>
          <li>{t('Policy.privacy-section-2-content-2')}</li>
          <li>{t('Policy.privacy-section-2-content-3')}</li>
        </ul>
      </div>

      <div className="section">
        <h2>{t('Policy.privacy-section-3-title')}</h2>
        <p>{t('Policyprivacy-section-3-content')}</p>
      </div>

      <div className="section">
        <h2>{t('Policy.privacy-section-4-title')}</h2>
        <p>{t('Policy.privacy-section-4-content')}</p>
      </div>

      <div className="section">
        <h2>{t('Policy.privacy-section-5-title')}</h2>
        <p>{t('Policy.privacy-section-5-content')}</p>
      </div>

      <div className="section">
        <h2>{t('Policy.privacy-section-6-title')}</h2>
        <p>{t('Policy.privacy-section-6-content')}</p>
      </div>

      <p className="footer">
        <strong>{t('Policy.privacy-footer-last-updated')}</strong>
      </p>
    </div>
  );
}

export default PrivacyPolicy;