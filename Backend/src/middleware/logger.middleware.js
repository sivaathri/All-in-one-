/**
 * Terminal Request & Response Logger Middleware
 * Provides real-time console feedback for API hits, response codes, execution times,
 * and clear debugging details when requests fail or crash.
 */

// ANSI Color Codes for readable terminal formatting
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  bgRed: '\x1b[41m',
  gray: '\x1b[90m'
};

const getStatusColor = (status) => {
  if (status >= 500) return colors.red;
  if (status >= 400) return colors.yellow;
  if (status >= 300) return colors.cyan;
  if (status >= 200) return colors.green;
  return colors.reset;
};

const getMethodColor = (method) => {
  switch (method) {
    case 'GET': return colors.green;
    case 'POST': return colors.cyan;
    case 'PUT':
    case 'PATCH': return colors.yellow;
    case 'DELETE': return colors.red;
    default: return colors.magenta;
  }
};

/**
 * Express middleware that logs incoming API hits and final response statuses.
 */
export const requestLogger = (req, res, next) => {
  // Skip verbose request logging during automated tests
  if (process.env.NODE_ENV === 'test') {
    return next();
  }

  const startTime = process.hrtime();
  const timestamp = new Date().toLocaleTimeString();

  // Log incoming request
  const methodColored = `${getMethodColor(req.method)}${colors.bright}${req.method}${colors.reset}`;
  console.log(`${colors.gray}[${timestamp}]${colors.reset} ➡️  ${methodColored} ${colors.bright}${req.originalUrl}${colors.reset}`);

  // Hook into response finish event
  res.on('finish', () => {
    const diff = process.hrtime(startTime);
    const timeMs = (diff[0] * 1000 + diff[1] / 1e6).toFixed(1);
    const statusColor = getStatusColor(res.statusCode);

    const statusBadge = `${statusColor}${colors.bright}${res.statusCode}${colors.reset}`;
    const duration = `${colors.gray}(${timeMs}ms)${colors.reset}`;

    const icon = res.statusCode >= 400 ? '⚠️ ' : '✅';
    console.log(`${colors.gray}[${timestamp}]${colors.reset} ${icon} ${methodColored} ${req.originalUrl} ➔ ${statusBadge} ${duration}`);
  });

  next();
};

export default requestLogger;
