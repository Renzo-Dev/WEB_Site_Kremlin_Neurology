using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Kremlin_Neurology.TagHelpers;

// CurrentDateTagHelper для отображения текущей даты
[HtmlTargetElement("nav-home-img")]
public class CurrentDateTagHelper : TagHelper
{
    
    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        
    }

    private string checkDate()
    {
        
        return "";
    }
}