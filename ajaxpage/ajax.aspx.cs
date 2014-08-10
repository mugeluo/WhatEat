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
            case "GetShopInfo":
                {
                    GetShopInfo ( );
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

    public void GetShopInfo ( )
    {
        string shopIndex = Request["shopIndex"];
        string resultStr= Common.GetShopInfo ( shopIndex ) ;
        if (string.IsNullOrEmpty ( resultStr ))
            resultStr = "{name:'自助烧烤 条测试点评，仅用于测试开发，仅用于测试开发',logo:'http://i2.dpfile.com/pc/c9d3f992618cc752ee3c168db06f9a0e(278x200)/thumb.jpg',address:'杨浦区淞沪路77号万达广场B1楼城中城B-18号商铺'}";
        resultObj.Add ( "result", resultStr );
    }
}