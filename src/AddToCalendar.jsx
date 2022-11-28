import { createElement, useState} from "react";
import "./ui/AddToCalendar.css";
//import React from "react";
import { GoogleCalendar, YahooCalendar,   ICalendar, OutlookCalendar,  } from 'datebook'

Date.prototype.addHours= function(h){
  var copiedDate = new Date();
  copiedDate.setTime(this.getTime() + (h*60*60*1000)); 
  return copiedDate;
}

export function AddToCalendar(props) {
    const { valueStartDateAttribute, valueEndDateAttribute,locationAttribute,descriptionAttribute, subjectAttribute,buttonCaption,bootstrapStyle } = props;
    const [calType, setCalType] = useState(); //create local variabele caltype en functie setCaltype, gebruikmakend van useState

    
    function createConfig() {

      const startdate = new Date(valueStartDateAttribute&&valueStartDateAttribute.value?valueStartDateAttribute.value:Date.now());

      const enddate = new Date(valueEndDateAttribute&&valueEndDateAttribute.value?valueEndDateAttribute.value: startdate.addHours(1));

      const config = {
        title: subjectAttribute&&subjectAttribute.value ? subjectAttribute.value:'',
        location: locationAttribute&&locationAttribute.value ? locationAttribute.value:'',
        description: descriptionAttribute&&descriptionAttribute.value ? descriptionAttribute.value:'',
        start: startdate,
        end: enddate
      }

      return config 

    }
    

    function createGoogleCalendar() {
      const calendar = new GoogleCalendar(createConfig());
      const url = calendar.render();
      return url;
    }
    function createOutlookCalendar() {
      const calendar = new OutlookCalendar(createConfig());
      const url = calendar.render();
      return url;

    }    
    function createOffice365Calendar() {
      const calendar = new OutlookCalendar(createConfig())
      calendar.setHost='office';
      const url = calendar.render();
      return url;

    }    
    function createYahooCalendar() {
      const calendar = new YahooCalendar(createConfig());
      const url = calendar.render();
      return url;

    }

    function createICalendar() {
      const calendar = new ICalendar(createConfig())
      const url = calendar.render()
      calendar.download('appointment.ics')
    }


     function download(e){

        e.preventDefault();
        icalendar.download('afspraak.ical')
    }

    function selectCalendar(){
      //selection = calType;
      switch (calType) {
        case "Google":
          window.open(createGoogleCalendar());
          break;
          case "Yahoo":
            window.open(createYahooCalendar()); 
            break;
            case "Outlook":
              createICalendar();
              break;
              case "MSCalendar":
                window.open(createOffice365Calendar());
                break;
              case "ICal":
                createICalendar();
                break;
                default:
                  alert('Please select a calendar'); 
      }
    }

    return (
      <div class='add-to-calendar-container col'>
        <div class='row'>
          <div class='mx-radiogroup'>

            <div class='radio' onClick={() => { setCalType("ICal"); }}>
              <input
                type="radio"
                name="calType"
                id='ICal'
                value={calType}
                checked={calType == "ICal"} 
              />
              <label for="ICal">iCalendar</label>
            </div>

            <div class='radio' onClick={() => { setCalType("Google"); }}>
              <input
                type="radio"
                name="calType"
                value={calType}
                id='Google'
                checked={calType == "Google"}

              />
              <label for="Google">Google Calendar</label>
            </div>

            <div class='radio' onClick={() => { setCalType("Outlook"); }}>
              <input
                type="radio"
                name="calType"
                value={calType}
                id='Outlook'
                checked={calType == "Outlook"}
              />
              <label for="Outlook">Outlook</label>
            </div>

            <div class='radio' onClick={() => { setCalType("Yahoo"); }}>
              <input
                type="radio"
                name="calType"
                value={calType}
                id='Yahoo'
                checked={calType == "Yahoo"}
              />
              <label for="Yahoo">Yahoo! Calendar</label>


            </div>
            <div class='radio' onClick={() => { setCalType("MSCalendar"); }}>
              <input
                type="radio"
                name="calType"
                value={calType}
                id='MSCalendar'
                checked={calType == "MSCalendar"}
              />
              <label for="MSCalendar">Microsoft Calendar</label>
            </div>


          </div>



        </div>
        <div class='row'>
        <button class={"spacing-outer-top-medium btn btn-" + bootstrapStyle} onClick={selectCalendar}>{buttonCaption.value ? buttonCaption.value : 'Submit'}</button>
        </div>
      </div>

    );
       
   
}
