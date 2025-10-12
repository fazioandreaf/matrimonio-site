# 💒 Il Nostro Matrimonio - Sito Web

Un sito web elegante per condividere i momenti speciali del matrimonio, con funzionalità di upload e visualizzazione delle foto tramite Cloudflare Images.

## 🚀 Funzionalità

- **Homepage elegante** con informazioni sul matrimonio
- **Galleria foto** con upload drag & drop
- **Programma eventi** dettagliato
- **Design responsive** ottimizzato per mobile e desktop
- **Upload sicuro** su Cloudflare Images
- **Deploy automatico** su Vercel

## 🛠️ Tecnologie Utilizzate

- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipizzazione statica
- **Tailwind CSS** - Styling utility-first
- **Cloudflare Images** - Hosting e ottimizzazione immagini
- **Vercel** - Deploy e hosting
- **Lucide React** - Icone moderne

## 📦 Installazione

1. **Clona la repository**
   ```bash
   git clone <your-repo-url>
   cd matrimonio-site
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Configura le variabili d'ambiente**
   ```bash
   cp env.example .env.local
   ```
   
   Aggiungi le tue credenziali Cloudflare:
   ```env
   CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
   CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
   ```

## 🔧 Configurazione Cloudflare

1. **Crea un account Cloudflare** (se non ce l'hai già)
2. **Vai su Cloudflare Images** nel dashboard
3. **Ottieni il tuo Account ID** dalle impostazioni
4. **Crea un API Token** con permessi per Images:
   - Account: Cloudflare Images:Edit
   - Zone Resources: Include All zones

## 🚀 Deploy su Vercel

1. **Connetti il repository a Vercel**
2. **Aggiungi le variabili d'ambiente** in Vercel:
   - `CLOUDFLARE_ACCOUNT_ID`
   - `CLOUDFLARE_API_TOKEN`
3. **Deploy automatico** ad ogni push

## 📱 Pagine del Sito

- **/** - Homepage con informazioni principali
- **/gallery** - Galleria foto con upload
- **/events** - Programma dettagliato degli eventi

## 🎨 Personalizzazione

### Modificare le informazioni del matrimonio
Edita il file `src/app/page.tsx` per cambiare:
- Nome degli sposi
- Data del matrimonio
- Luogo
- Descrizioni

### Modificare il programma eventi
Edita il file `src/app/events/page.tsx` per aggiornare:
- Orari degli eventi
- Luoghi
- Descrizioni

### Personalizzare i colori
Modifica il file `tailwind.config.js` per cambiare la palette colori.

## 🔒 Sicurezza

- Le immagini vengono caricate direttamente su Cloudflare
- Validazione lato server per tipo e dimensione file
- Rate limiting per prevenire abusi
- HTTPS forzato su Vercel

## 📊 Performance

- **Ottimizzazione automatica** delle immagini con Cloudflare
- **Lazy loading** per le immagini
- **Server-side rendering** per SEO
- **CDN globale** per velocità di caricamento

## 🐛 Troubleshooting

### Errore di upload
- Verifica che le variabili d'ambiente siano corrette
- Controlla che il token Cloudflare abbia i permessi giusti
- Assicurati che il file sia un'immagine valida (< 10MB)

### Problemi di deploy
- Verifica che tutte le dipendenze siano installate
- Controlla i log di build su Vercel
- Assicurati che le variabili d'ambiente siano configurate

## 📞 Supporto

Per problemi o domande, contatta gli sviluppatori o apri un issue su GitHub.

---

**Fatto con ❤️ per il giorno più bello della vostra vita**