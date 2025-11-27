import { writeFile, utils } from 'xlsx';

export const exportToExcel = <T>(data: T[], fileName: string): void => {
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(data);
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    writeFile(workbook, `${fileName}.xlsx`);
};