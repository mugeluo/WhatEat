using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ajaxpage_ajax : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string option = Request["option"];

        switch (option)
        {
            case "a":
                {
                    break;
                }
            default
                {
            break;
            }
        }
    }
}