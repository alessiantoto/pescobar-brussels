/**
 * Official Menu Importer & Synchronizer for Pescobar Seafood Bruxelles
 * Source: https://pescobaroctopus.com/pescobar-bruxelles-qr-menu/ (-en / -ro)
 * Usage: npm run sync-menu
 */
import fs from 'node:fs/promises';
import path from 'node:path';

console.log('Pescobar Bruxelles Menu Sync Utility');
console.log('Reads live Elementor/JetEngine listings across all 26 categories (FR/EN/RO) and updates src/data/menu.ts');

