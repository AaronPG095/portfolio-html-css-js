'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import styles from './About.module.css';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className={styles.about} aria-label="About section">
      <div className={styles.titleContainer}>
        <div className={styles.titleText}>
          <p className={styles.subtitle}>{t('about.subtitle')}</p>
          <h1 className={styles.title}>{t('about.title')}</h1>
        </div>
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.containers}>
          <div className={styles.detailsCard}>
            <Image
              src="/assets/experience.png"
              alt=""
              className={styles.icon}
              width={32}
              height={32}
              aria-hidden="true"
            />
            <h3>{t('about.experience')}</h3>
            <p>{t('about.experienceYears')}</p>
            <p>{t('about.experienceMonths')}</p>
          </div>
          <div className={styles.detailsCard}>
            <Image
              src="/assets/education.png"
              alt=""
              className={styles.icon}
              width={32}
              height={32}
              aria-hidden="true"
            />
            <h3>{t('about.education')}</h3>
            <p>
              <a
                href="https://start.digitalcareerinstitute.org/web-developer-weiterbildung/?utm_feeditemid=&utm_device=c&utm_campaign_id=23197762765&utm_adgroup_id=190164558840&utm_ad_id=781039568826&utm_asset_set_id=190164558840&utm_asset_id=781039568826&utm_term=dci%20web%20development&utm_source=google&utm_medium=ppc&utm_campaign=DE_SEM_Generic_overall&utm_content=190164558840&hsa_cam=23197762765&hsa_mt=p&hsa_src=g&hsa_acc=9628643656&hsa_net=adwords&hsa_kw=dci%20web%20development&hsa_tgt=kwd-1027333770361&hsa_ver=3&hsa_grp=190164558840&hsa_ad=781039568826&gad_source=1&gad_campaignid=23197762765&gbraid=0AAAAAC_FL9G14YQARMG2h8iF7jTnyug0E&gclid=CjwKCAiA55rJBhByEiwAFkY1QC-TDKIiANMVNKhvTQa1x1OXbHk8mSrMpjli4Y2NlxEHloOqbRD3OxoCljkQAvD_BwE"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit DCI Bootcamp website"
              >
                {t('about.education1')}
              </a>
              <br />
              {t('about.education2')}
            </p>
          </div>
        </div>
        <div className={styles.textContainer}>
          <div className={styles.textContent}>
            <p>{t('about.description1')}</p>
            <p>{t('about.description2')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
