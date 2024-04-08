
export default function getFormatDate(inputDate) {
    // Parse the input string into a Date object
    const date = new Date(inputDate);
    
    // Define month names
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    // Get day, month, and year from the date object
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    // Format the date string
    const formattedDate = `${day < 10 ? '0' + day : day}-${monthNames[monthIndex]}-${year}`;
  
    return formattedDate;
  }