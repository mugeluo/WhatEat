﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class demo : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //this.test.InnerHtml = Common.GetTemperature().ToString();

        this.test.InnerHtml = Common.GetKeywordsByUserLog ( ).ToString ( );
    }
}