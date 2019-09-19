//ver 1.2
//Corrected the field: gb_free_data_remaining to trial_data_remaining_gb

//ver 1.3: Corrected the bug which caused the fields containing dates in intercom to be set on defult if found empty in hubspot (Jan 1, 1970)

//ver 1.4
//     Added the following fields from HubSpot: 
//     nb_portals
//     personalized_rush_url
//     customer_ranking
//     portals_usage_all_time_gb
//     first_package_sent_at


'use strict';

const requestLib = require('request');

module.exports.sync = (event, context, callback) => {  
  // Parsing the JSON
  var parsing = JSON.parse(event.body);
  var intercom_data = {};
  intercom_data.custom_attributes = {};


  // mapping the values
  {
    // email
    intercom_data.email = parsing.properties.email.value;

    // Number of Portals
    {
      if ((parsing.properties.hasOwnProperty('nb_portals')) == true && parsing.properties.nb_portals.value != "") {
        intercom_data.custom_attributes.nb_portals = parsing.properties.nb_portals.value;
      } 
      // else {
      //   intercom_data.custom_attributes.nb_portals = 0;
      // }
    }
    
    // Peronalized RUSH URL
    {
      if ((parsing.properties.hasOwnProperty('personalized_rush_url') && parsing.properties.personalized_rush_url.value != "") == true) {
        intercom_data.custom_attributes.personalized_rush_url = parsing.properties.personalized_rush_url.value;
      }
      // else {
      //   intercom_data.custom_attributes['Personalized Portal URL'] = 'a123';
      // }
    }

    // Customer ranking
    {
      if ((parsing.properties.hasOwnProperty('customer_ranking')) == true && parsing.properties.customer_ranking.value != "") {
        intercom_data.custom_attributes.customer_ranking = parsing.properties.customer_ranking.value;
      }
    }

    // Portal usage all time
    {
      if ((parsing.properties.hasOwnProperty('portals_usage_all_time_gb')) == true && parsing.properties.portals_usage_all_time_gb.value != "") {
        intercom_data.custom_attributes.portals_usage_all_time_gb = parsing.properties.portals_usage_all_time_gb.value;
      }
    }
    
    // First package sent date
    {
      if ((parsing.properties.hasOwnProperty('first_package_sent_at')) == true && parsing.properties.first_package_sent_at.value != "") {
        intercom_data.custom_attributes.first_package_sent_at = ((Math.floor(parsing.properties.first_package_sent_at.value / 1000))+86400);
      } 
      // else {
      //   intercom_data.custom_attributes.first_package_sent_at = ((Math.floor(Date.now() / 1000)+86400));
      // }
    }

    // Free trial data remaining 
    {
      if ((parsing.properties.hasOwnProperty('trial_data_remaining_gb')) == true && parsing.properties.trial_data_remaining_gb.value != "") {
        intercom_data.custom_attributes.gb_free_data_remaining = parsing.properties.trial_data_remaining_gb.value;
      }
    }
    
    // MASV Email sent date
    {
      if ((parsing.properties.hasOwnProperty('masv_rush_invitation_sent_date')) == true && parsing.properties.masv_rush_invitation_sent_date.value != "") {
        intercom_data.custom_attributes.masv_email_sent_at = ((Math.floor(parsing.properties.masv_rush_invitation_sent_date.value / 1000))+86400);
      } 
      // else {
      //   intercom_data.custom_attributes.masv_email_sent_at = ((Math.floor(Date.now() / 1000)+86400));
      // }
    }

    // Peronalized Portal URL
    {
      if ((parsing.properties.hasOwnProperty('personalized_portal_url')) == true && parsing.properties.personalized_portal_url.value != "") {
        intercom_data.custom_attributes['Personalized Portal URL'] = parsing.properties.personalized_portal_url.value;
      }
      // else {
      //   intercom_data.custom_attributes['Personalized Portal URL'] = 'a123';
      // }
    }

    // MASV Email registered at date
    {
      if ((parsing.properties.hasOwnProperty('masv_rush_invitation_accepted_date')) == true && parsing.properties.masv_rush_invitation_accepted_date.value != "") {
        intercom_data.custom_attributes.masv_email_registered_at = ((Math.floor(parsing.properties.masv_rush_invitation_accepted_date.value / 1000))+86400);
      } 
      // else {
      //   intercom_data.custom_attributes.masv_email_registered_at = (Math.floor(Date.now() / 1000));
      // }
    }

    // MASV Trial expiry date
    {
      if ((parsing.properties.hasOwnProperty('trial_expiry_date')) == true && parsing.properties.trial_expiry_date.value != "") {
        intercom_data.custom_attributes.masv_trial_expiry_date = ((Math.floor(parsing.properties.trial_expiry_date.value / 1000))+86400);
      } 
      // else {
      //   intercom_data.custom_attributes.masv_trial_expiry_date = (Math.floor(Date.now() / 1000));
      // }
    }

    // Rush Invitation Token
    {
      if ((parsing.properties.hasOwnProperty('masv_rush_invite_token')) == true && parsing.properties.masv_rush_invite_token.value != "") {
        intercom_data.custom_attributes.masv_invitation_token = parsing.properties.masv_rush_invite_token.value;
      } 
      // else {
      //   intercom_data.custom_attributes.masv_invitation_token = 'a123';
      // }
    }

    // Month's billable data
    {
      if ((parsing.properties.hasOwnProperty('masv_rush_this_months_billable_data')) == true && parsing.properties.masv_rush_this_months_billable_data.value != "") {
        intercom_data.custom_attributes.masv_monthly_billable_data = parsing.properties.masv_rush_this_months_billable_data.value;
      } 
      // else {
      //   intercom_data.custom_attributes.masv_monthly_billable_data = 0;
      // }
    }

    // Friends referred
    {
      if ((parsing.properties.hasOwnProperty('friends_referred')) == true && parsing.properties.friends_referred.value != "") {
        intercom_data.custom_attributes.masv_friends_referred = parsing.properties.friends_referred.value;
      } 
      // else {
      //   intercom_data.custom_attributes.masv_friends_referred = 0;
      // }
    }

    // lead funnel step
    {
      if ((parsing.properties.hasOwnProperty('lead_funnel_step')) == true && parsing.properties.lead_funnel_step.value != "") {
        intercom_data.custom_attributes.masv_funnel_status = parsing.properties.lead_funnel_step.value;
      }
      // else {
      //   intercom_data.custom_attributes.masv_funnel_status = 'a123';
      // }
    }

    // GB Sent in last 15 days
    {
      if ((parsing.properties.hasOwnProperty('gb_sent_past_15_days')) == true && parsing.properties.gb_sent_past_15_days.value != "") {
        intercom_data.custom_attributes.masv_gb_15_days = parsing.properties.gb_sent_past_15_days.value;
      }
      // else {
      //   intercom_data.custom_attributes.masv_gb_15_days = 0;
      // }
    }

    // Packages sent
    {
      if ((parsing.properties.hasOwnProperty('packages_sent')) == true && parsing.properties.packages_sent.value != "") {
        intercom_data.custom_attributes.masv_packages_sent = parsing.properties.packages_sent.value;
      } 
      // else {
      //   intercom_data.custom_attributes.masv_packages_sent = 0;
      // }
    }

  }

  var uri = encodeURIComponent(intercom_data.email);
  requestLib.post(("https://api.intercom.io/users?email=" + uri), {
    headers: {
      "Authorization": "Bearer dG9rOmYwZThhYjkwXzVlZGNfNGFlNl9hOWUzX2JhODI5NjgyMTA3NzoxOjA=",
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    json: intercom_data
  }, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);

    const res = {
      statusCode: 200,
      body: JSON.stringify({
        input: event,
      }),
    };
  
  
    callback(null, res);
  });
};
