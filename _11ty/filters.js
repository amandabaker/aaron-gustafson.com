const { DateTime } = require("luxon");
const widont = require("widont");

function parse_date( date ){
  if ( ! date ) {
    return DateTime.now();
  }
  // try JS
  var the_date = DateTime.fromJSDate(date);
  // then try ISO
  if ( the_date.invalid ) {
    the_date = DateTime.fromISO(date);
  }
  // fallback to SQL
  if ( the_date.invalid ) {
    the_date = DateTime.fromSQL(date);
  }
  return the_date;
}

module.exports = {
  
  readable_date: date => {
    return parse_date( date ).toFormat("dd LLL yyyy");
  },
  ymd_date: date => {
    return parse_date( date ).toISODate();
  },
  machine_date: date => {
    return parse_date( date ).toISO();
  },

  widont: text => {
    return `${widont( text )}`;
  },

  limit: (array, limit) => {
    return array.slice(0, limit);
  },
  
  past: array => {
    const now = DateTime.now();
    return array
             .filter( el => DateTime.fromSQL( el.date ) <= now )
             .sort( (a,b) => {
               a = DateTime.fromSQL( a.date );
               b = DateTime.fromSQL( b.date );
               return a < b ? -1 : a > b ? 1 : 0;
             })
             .reverse();
  },
  future: array => {
    const now = DateTime.now();
    return array
             .filter( el=> DateTime.fromSQL( el.date ) > now )
             .sort( (a,b) => {
               a = DateTime.fromSQL( a.date );
               b = DateTime.fromSQL( b.date );
               return a < b ? -1 : a > b ? 1 : 0;
             });
  },

  bySeriesTag: ( array, tag ) => {
    return array.filter( item => {
      return "series" in item.data &&
             item.data.series.tag == tag;
    });
  },

  unescape: html => {
    html = html || "";
    return html.replace(/&gt;/g, ">")
            .replace(/&lt;/g, "<")
            .replace(/&quot;/g, '"');
  },

  minus: ( a, b ) => parseInt(a,10) - parseInt(b,10),
  size: array => !array ? 0 : array.length,
  required: ( items, requirements ) => {
    var type;
    if ( requirements.indexOf( "||" ) > 0 )
    {
      type = "or";
      requirements = requirements.split( "||" );
    }
    else if ( requirements.indexOf( "&&" ) > 0 )
    {
      type = "and";
      requirements = requirements.split( "&&" );
    }
    else
    {
      type = "single";
      requirements = [ requirements ];
    }
    requirements = requirements.map(item => item.trim());
    return items.filter(item => {
      let i = requirements.length;
      // all
      if ( type == "and" )
      {
        while ( i-- )
        {
          if ( ! item[requirements[i]] )
          { 
            return false;
          }
        }
        return true;
      }
      // any
      else
      {
        while ( i-- )
        {
          if ( item[requirements[i]] )
          { 
            return true;
          }
        }
        return false;
      }
    });
  },

  content_type: path => {
    let type = "post";
    if ( path && path.indexOf("/links/") > -1 )
    {
      type = "link";
    }
    return type;
  },
  path_in_scope: ( path, scope ) => {
    return path.indexOf( scope ) > -1;
  },

  getWebmentionsForUrl: (webmentions, url) => {
    return webmentions.children
             .filter(entry => entry['wm-target'] === url)
             .sort( (a,b) => {
               return a["wm-id"] - b["wm-id"];
             });
  },
  webmentionsByType: (mentions, mentionType) => {
    return mentions.filter(entry => {
      if ( mentionType instanceof Array )
      {
        let count = mentionType.length;
        while( count-- )
        {
          if ( !!entry[mentionType[count]] )
          {
            return true;
          }
        }
        return false;
      }
      else
      {
        return !!entry[mentionType];
      }
    });
  },

  // use with collections.feedAll
  related: ( collection, url, tag ) => {
    return collection
            // make sure it has the same tags
            .filter( item => "tags" in item.data && item.data.tags.indexOf( tag ) > -1 )
            // only if not this page
            .filter( item => url.indexOf( item.fileSlug ) == -1 );
  }
};