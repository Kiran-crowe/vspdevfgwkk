import { LightningElement, api, track,wire } from 'lwc';
import getVSP_Simple_Quotes_Manufacturing_Plant from '@salesforce/apex/vsp_fg_SalesSelectorController.getVSP_Simple_Quotes_Manufacturing_Plant';
import VSP_FG_Form_Close from '@salesforce/label/c.VSP_FG_Form_Close';

export default class Vsp_fg_Sales_Selector extends LightningElement {

	

	// Change to false after testing
	@track isModalOpen = true; 
   // VSP_Simple_Quotes_Manufacturing_Plant__mdt ,plant__c
    @track lstPlants =[];
	wiredRecords;

	label = { VSP_FG_Form_Close };

    constructor(){
        super();
        this.getManufactuingPlants();
    }

    getManufactuingPlants(){
        getVSP_Simple_Quotes_Manufacturing_Plant().then(res=>{
            this.lstPlants = res;
        }).catch(err=>{
            console.log(err);
        });
    }

	

	
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }

    closeModal(event) {
			console.log('label ' + event.target.label);
            event.preventDefault();
            const fields = event.detail.fields;
            const All_Compobox_Valid = [...this.template.querySelectorAll('lightning-combobox')]
                .reduce((validSoFar, input_Field_Reference) => {
                    input_Field_Reference.reportValidity();
                    return validSoFar && input_Field_Reference.checkValidity();
                }, true);
    
            if(All_Compobox_Valid){
                this.template.querySelector('lightning-record-edit-form').submit(fields);
            }
            else{
                // show toast error message if required
                
                const event = new ShowToastEvent({
                    title : 'Error',
                    message : 'Please select Manufacturing Plant.',
                    variant : 'error'
                });
               // this.dispatchEvent(event);
                
            }
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
				this.dispatchEvent(new CustomEvent('closemodal', {
						detail: {action : event.target.value, plant : this.selectedValue }
					})
				)
    }

	closeConfirmation() {
		this.isModalOpen = false;
	}

	closeAll() {
		this.dispatchEvent(new CustomEvent('closemodal'));
	}


	handleChange(event) {
        this.value = event.detail.value;
    }

	
}