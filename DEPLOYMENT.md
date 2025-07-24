# Deployment Guide - Parul University Event Manager

## Quick Start

### Local Development

1. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd parul-university-event-manager
   npm install
   npm start
   ```

2. **Access Application**
   - URL: `http://localhost:3000`
   - Default Port: 3000

### Demo Credentials

#### Students
- **College ID**: PU2021001, **Email**: student1@paruluniversity.ac.in, **Password**: password123
- **College ID**: PU2021002, **Email**: student2@paruluniversity.ac.in, **Password**: password123
- **College ID**: PU2021003, **Email**: student3@paruluniversity.ac.in, **Password**: password123

#### Event Heads
- **Email**: priya.sharma@paruluniversity.ac.in, **Password**: eventhead123
- **Email**: rahul.patel@paruluniversity.ac.in, **Password**: eventhead123

## Production Deployment

### 1. Environment Setup

```bash
# Set production environment
export NODE_ENV=production
export PORT=80

# Install dependencies
npm ci --only=production
```

### 2. Process Management

Using PM2 for production:
```bash
npm install -g pm2
pm2 start server.js --name "parul-event-manager"
pm2 startup
pm2 save
```

### 3. Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Docker Deployment

### Dockerfile
```dockerfile
FROM node:16-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 3000

CMD ["npm", "start"]
```

### Build and Run
```bash
docker build -t parul-event-manager .
docker run -p 3000:3000 parul-event-manager
```

### Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

## Cloud Deployment

### Heroku
```bash
# Install Heroku CLI
heroku create parul-event-manager
git push heroku main
heroku open
```

### AWS EC2
1. Launch EC2 instance (Ubuntu 20.04)
2. Install Node.js and npm
3. Clone repository
4. Configure security group (port 3000, 80, 443)
5. Setup domain and SSL

### Digital Ocean
1. Create droplet (Ubuntu)
2. Follow local deployment steps
3. Configure firewall
4. Setup domain

## Database Setup (Future Enhancement)

### MongoDB
```bash
# Install MongoDB
sudo apt install mongodb
mongod --dbpath /var/lib/mongodb

# Connection string
MONGODB_URI=mongodb://localhost:27017/parul_events
```

### PostgreSQL
```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb parul_events
```

## Security Considerations

### Environment Variables
```bash
# .env file
NODE_ENV=production
PORT=3000
SESSION_SECRET=your-secure-secret
JWT_SECRET=your-jwt-secret
```

### Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

## Monitoring

### Health Check Endpoint
```javascript
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### Logging
```bash
# Using PM2 logs
pm2 logs parul-event-manager

# Custom logging
npm install winston
```

## Backup Strategy

### Data Backup
```bash
# Local storage backup
tar -czf backup-$(date +%Y%m%d).tar.gz localStorage/

# Database backup (when implemented)
mongodump --db parul_events --out backup/
```

### Automated Backups
```bash
# Crontab entry
0 2 * * * /path/to/backup-script.sh
```

## Performance Optimization

### Compression
```javascript
const compression = require('compression');
app.use(compression());
```

### Static File Caching
```javascript
app.use(express.static('public', {
  maxAge: '1d'
}));
```

### CDN Integration
- Use CloudFlare or AWS CloudFront
- Optimize images and assets
- Enable GZIP compression

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   lsof -ti:3000 | xargs kill -9
   ```

2. **Node Modules Issues**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Socket.IO Connection Issues**
   - Check firewall settings
   - Verify WebSocket support
   - Check proxy configuration

### Log Analysis
```bash
# Real-time logs
pm2 logs --lines 100

# Error logs
grep "ERROR" /var/log/nodejs/app.log
```

## Scaling

### Horizontal Scaling
```javascript
// Use Redis for session storage
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

app.use(session({
  store: new RedisStore({}),
  secret: process.env.SESSION_SECRET
}));
```

### Load Balancing
```nginx
upstream app_servers {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
}

server {
    location / {
        proxy_pass http://app_servers;
    }
}
```

## Maintenance

### Updates
```bash
# Update dependencies
npm update
npm audit fix

# Restart application
pm2 restart parul-event-manager
```

### Health Monitoring
```bash
# System resources
htop
df -h
free -m

# Application status
pm2 status
```

---

## Support

For deployment support:
- Technical Team: tech@paruluniversity.ac.in
- Documentation: Check README.md
- Issues: Create GitHub issue