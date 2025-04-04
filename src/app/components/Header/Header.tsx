'use client';

import React, { useState } from 'react';
import styles from './Header.module.css';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import Image from 'next/image';
import ProfilePictureUpload from '../ProfilePictureUpload/ProfilePictureUpload';

const Header: React.FC = () => {
  const { user, logout, isLoading } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const profilePicUrl = user?.profilePictureUrl || '/default-avatar.png';

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  if (isLoading) {
    return (
      <header className={styles.headerContainer}>
        <p className={styles.logoLink}>
          <Link href="/">Forsíða</Link>
        </p>
        <div className={styles.loadingPlaceholder}>Hleður...</div>
      </header>
    );
  }

  return (
    <>
      <header className={styles.headerContainer}>
        <p className={styles.logoLink}>
          <Link href="/">Forsíða</Link>
        </p>

        <nav className={styles.navigation}>
           {user && (
             <Link href="/transactions" className={styles.navLink}>Færslur</Link>
           )}
        </nav>

        <section className={styles.userArea}>
          {user ? (
            <div className={styles.userInfoContainer}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={styles.userButton}
                aria-haspopup="true"
                aria-expanded={showDropdown}
              >
                 <Image
                    key={profilePicUrl}
                    src={profilePicUrl}
                    alt="Prófílmynd"
                    width={30}
                    height={30}
                    className={styles.avatar}
                    priority={false}
                    onError={(e) => { (e.target as HTMLImageElement).src = '/default-avatar.png'; }}
                 />
                 <span className={styles.username}>{user.username}</span>
                 <span className={styles.dropdownArrow}>{showDropdown ? '▲' : '▼'}</span>
              </button>

              {showDropdown && (
                <div className={styles.dropdownMenu} role="menu">
                   <button
                      role="menuitem"
                      onClick={() => { setShowUploadModal(true); setShowDropdown(false); }}
                      className={styles.dropdownItem}
                   >
                     Skipta um mynd
                   </button>
                   <button
                      role="menuitem"
                      onClick={handleLogout}
                      className={styles.dropdownItem}
                   >
                     Útskrá
                   </button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.authLinks}>
              <Link href="/login" className={styles.authLink}>Innskrá</Link>
              <Link href="/register" className={styles.authLink}>Nýskrá</Link>
            </div>
          )}
        </section>
      </header>

      {showUploadModal && user && (
         <ProfilePictureUpload
             onClose={() => setShowUploadModal(false)}
         />
      )}
    </>
  );
};

export default Header;