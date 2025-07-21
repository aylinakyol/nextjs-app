import Link from 'next/link';
import { useRouter } from 'next/router';
import useTheme from '@/lib/useTheme';
import Layout from './Layout';

export default function Navigation() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const slug = "1";

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="flex-row-center">
          <Link
            href="/"
            className={`nav-link ${router.pathname === '/' ? 'nav-link-active' : ''}`}
          >
            Ana Sayfa
          </Link>
          <Link
            href="/category"
            className={`nav-link ${router.pathname === '/' ? 'nav-link-active' : ''}`}
          >
            Categories
          </Link>
  
          <Layout />
        </li>

      </ul>
    </nav>
  );
}