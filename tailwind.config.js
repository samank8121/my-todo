module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Roboto', 'ui-sans-serif', 'system-ui','Helvetica', 'Arial', 'sans-serif']
    },
    extend: {
      colors: {
        'button-blue': '#5582EF',
        'tab-text':'#2464FC',
        'tab-inactive-bg':'#F8F8F8',
        'tab-inactive-text':'#43425D',
        'tab-border':'#E9E9F0',
        'delete-red':'#F64F71',
        'paused':'#FFA700',
        'inprogress':'#1984B8',
        'grid-seperator':'#D4D6DD9A',
        'grid-header':'#808080',
        'grid-text': '#272727',
        'filter':'#4D4F5C'
      },
      fontSize: {
        '15': ['15px','22px'],
        '19': ['19px','28px']  
      }        
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
