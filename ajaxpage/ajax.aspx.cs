using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Newtonsoft.Json;

public partial class ajaxpage_ajax : System.Web.UI.Page
{
    JavaScriptObject resultObj = new JavaScriptObject ( );
    protected void Page_Load(object sender, EventArgs e)
    {
        string option = Request["option"];
        switch (option)
        {
            case "GetPointer":
                {
                    GetPointer ( );
                    break;
                }
            default:
                {
                    break;
                }
        }

        Response.Clear ( );
        Response.AddHeader ( "charset", "UTF-8" );
        Response.AddHeader ( "Content-Type", "Application/json" );
        Response.Write ( JavaScriptConvert.SerializeObject ( resultObj ) );
        Response.End ( );
    }

    public void GetPointer ( ) 
    {
        resultObj.Add ( "result", Common.GetPointer ( ) );
    }
}