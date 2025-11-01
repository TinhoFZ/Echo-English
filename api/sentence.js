const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  try {
    const basePath = path.join(process.cwd(), 'assets', 'sentences');
    const am = fs.readFileSync(path.join(basePath, 'am.txt'), 'utf8');
    const is = fs.readFileSync(path.join(basePath, 'is.txt'), 'utf8');
    const are = fs.readFileSync(path.join(basePath, 'are.txt'), 'utf8');
    res.status(200).json({ am, is, are });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
