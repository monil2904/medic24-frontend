const fs = require('fs');
const path = require('path');

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.match(/\.(ts|tsx)$/)) {
            let src = fs.readFileSync(fullPath, 'utf8');
            let updated = src.replace(/Med24/g, 'Medic24').replace(/med24/g, 'medic24').replace(/MED24/g, 'MEDIC24');
            if (src !== updated) {
                fs.writeFileSync(fullPath, updated);
                console.log('Updated ' + fullPath);
            }
        }
    });
}

walk('./src');
console.log('Done');
