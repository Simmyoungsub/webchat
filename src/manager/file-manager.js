// saveAs(Blob/File data, optional DOMString filename, optional Boolean disableAutoBOM)
const fileSaver = require('file-saver');
let table = '';
const downloadWord = (() => {
    fileSaver.saveAs(new Blob([getTable()], {type: 'application/msword;charset=utf-8'}), 'test.doc');
});

const getTable = (() => {
    return `<table style="border: 1px solid black;">
                <thead style="border: 1px solid black;">
                    <tr style="border: 1px solid black;">
                        <th style="border: 1px solid black;">0</th>
                        <th style="border: 1px solid black;">0</th>                    
                    </tr>                
                </thead>
                <tbody style="border: 1px solid black;">
                    <tr style="border: 1px solid black;">
                        <td style="border: 1px solid black;">1</td>
                        <td style="border: 1px solid black;">1</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid black;">1</td>
                        <td style="border: 1px solid black;">1</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid black;">1</td>
                        <td style="border: 1px solid black;">1</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid black;">1</td>
                        <td style="border: 1px solid black;">1</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid black;">1</td>
                        <td style="border: 1px solid black;">1</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid black;">1</td>
                        <td style="border: 1px solid black;">1</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid black;">1</td>
                        <td style="border: 1px solid black;">1</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid black;">1</td>
                        <td style="border: 1px solid black;">1</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid black;">1</td>
                        <td style="border: 1px solid black;">1</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid black;">1</td>
                        <td style="border: 1px solid black;">1</td>
                    </tr>                
                </tbody>
            </table>`
});

module.exports = {
    downloadWord
};