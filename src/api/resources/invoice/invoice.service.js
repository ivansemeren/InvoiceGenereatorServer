export default{
    getTotal(invoice){
        let total = 0;
        let subTotal = 0;
        let saleTax = 0;

        if (typeof invoice.qty !== 'undefined' && typeof invoice.rate !== 'undefined' && typeof invoice.tax !== 'undefined'){
            saleTax = (invoice.qty * invoice.rate) * (invoice.tax/100);
        }
        if (typeof invoice.qty !== 'undefined' && typeof invoice.rate !== 'undefined'){
            total = (invoice.rate * invoice.qty);
        }
        subTotal = total + saleTax;
        return {total, subTotal, saleTax};  
    },
    getTemlateBody(invoice){
        const {total, subTotal, saleTax} = this.getTotal(invoice);
        const templateBody = `
            <div class="container">
                <div class="row">
                    <div class="col-xs-6">
                    </div>
                    <div class="col-xs-6 text-right">
                        <h1>INVOICE</h1>
                        <h1>
                            <small>${invoice.item}</small>
                        </h1>
                    </div>
                </div>
                    <div class="row">
                    <div class="col-xs-5">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4>From:
                                    <a>Ivan Semerenko</a>
                                </h4>
                            </div>
                            <div class="panel-body">
                                <p>
                                    ivankosemerenko@gmail.com
                                    <br>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-5 col-xs-offset-2 text-right">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4>To :
                                    <a>${invoice.client.firstName} ${invoice.client.lastName}</a>
                                </h4>
                            </div>
                            <div class="panel-body">
                                <p>
                                    ${invoice.client.email}
                                    <br>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table table-bordered">
                   <thead>
                    <tr>
                        <th>
                            <h4>Qty</h4>
                        </th>
                        <th>
                            <h4>Rate</h4>
                        </th>
                        <th>
                            <h4>Tax</h4>
                        </th>
                    </tr>
                  </thead>
                    <tbody>
                        <tr>
                            <td>${invoice.qty}</td>
                            <td>${invoice.rate}</td>
                            <td>${invoice.tax}</td>
                        </tr>
                   </tbody>
                </table>
                <div class="row text-right">
                    <div class="col-xs-2 col-xs-offset-8">
                        <p>
                            <strong>
                                 Total :
                                <br> TAX :
                                <br> Sub Total :
                                <br>
                            </strong>
                        </p>
                    </div>
                    <div class="col-xs-2">
                        <strong>
                            $${total}
                            <br> $${saleTax}
                            <br> $${subTotal}
                            <br>
                        </strong>
                    </div>
                </div>
            </div>
        `
        return templateBody;
    },
    getInvoiceTemplate(templateBody) {
        const html = `
        <html>
        <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
            <style>
                @import url(https://fonts.googleapis.com/css?family=Bree+Serif);
                body, h1, h2, h3, h4, h5, h6 {
                    font-family: 'Bree Serif', serif;
                }
            </style>
        </head>
        <body>
            ${templateBody}
        </body>
        </html>
        `;
        return html;
    }
}