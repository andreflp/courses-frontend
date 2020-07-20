app.factory('reportService', function() {

  const _printPDF = function (data) {
    const doc = new jsPDF()
    let table = document.createElement('TABLE')
    table.id = 'table'
    document.body.appendChild(table)
  
    doc.text(data.title, 105, 25, null, null, 'center')
    doc.autoTable({ html: '#table' })
    doc.autoTable({
      head: [data.cols],
      body: data.rows,
      startY: 35,
      margin: { horizontal: 5 },
      theme: 'striped'
    })
    doc.save(`${data.file}.pdf`)
  }

  return {
    printPDF: _printPDF
  }
  
})