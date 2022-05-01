import FinancialReportsModel from "@/models/dynamics/dashboard/FinancialReportsModel";
import FinancialReports from "@/views/dynamics/dashboard/FinancialReports";

const FINANCIAL_REPORTS_PAGE_SIZE = 20;

export default class FinancialReportsController{
    
    /**@param {FinancialReports} view*/
    constructor(view){
        this.view = view;
        this.model = new FinancialReportsModel();
    }
    
    loadSellReportTable(page=1){

        let params = {filter:"rf_sells"};

        this.view.setState({loading:true});

        this.model.getFinancialReport(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let d = data.data;

                this.view.setState({
                    loading: false,
                    data: d.list,
                    total: d.total,
                    currentPage: page,
                    table: "1",
                });
            }
        });
    }

    loadCreditBoughtTable(page=1){

        let params = {filter:"rf_increase_m_balacne"};

        this.view.setState({loading:true});

        this.model.getFinancialReport(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let d = data.data;

                this.view.setState({
                    loading: false,
                    data: d.list,
                    total:d.total,
                    currentPage: page,
                    table:"2",
                });
            }
        });
    }

    loadCreditUsedTable(page=1){

        let params = {filter:"rf_decrease_m_balacne"};

        this.view.setState({loading:true});

        this.model.getFinancialReport(params, (err, data)=>{

            if(data.result_code === env.SC.SUCCESS){

                let d = data.data;

                this.view.setState({
                    loading: false,
                    data: d.list,
                    total:d.total,
                    currentPage: page,
                    table:"3",
                });
            }
        });
    }
    
    onTabSelect(tab){

        switch(tab){
            case "1":
                this.loadSellReportTable();
                break;
            case "2":
                this.loadCreditBoughtTable();
                break;
            case "3":
                this.loadCreditUsedTable();
                break;
        }
    }

    onPageChange(page){

        let tab = this.view.state.table;
        switch(tab){
            case "1":
                this.loadSellReportTable(page);
                break;
            case "2":
                this.loadCreditBoughtTable(page);
                break;
            case "3":
                this.loadCreditUsedTable(page);
                break;
        }
    }
}