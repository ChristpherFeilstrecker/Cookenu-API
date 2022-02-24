
export class currentDate {
    actualDate = (
    ): string => {
var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    let actualDate = dia + '/' + mes + '/' + ano;
    return actualDate
    }

}