import opentype from 'opentype.js'
import { load } from 'opentype.js'


// Promise<{ author: string; website: string }>
const extractFontMetadata =  (fontBlob) =>  {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function(event) {
            const arrayBuffer = event.target.result;

            opentype.parse(arrayBuffer, function(err, font) {
                if (err) {
                    reject(new Error('无法解析字体: ' + err));
                } else {
                    const author = font.names.designer?.en || 'Unknown';
                    const website = font.names.designerURL?.en || 'Unknown';
                    resolve({ author, website });
                }
            });
        };

        reader.onerror = function() {
            reject(new Error('无法读取字体 Blob'));
        };

        reader.readAsArrayBuffer(fontBlob);
    });
}

export {extractFontMetadata}
