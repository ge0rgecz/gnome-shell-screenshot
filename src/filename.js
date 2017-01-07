
const Gettext = imports.gettext.domain('gnome-shell-screenshot');
const _ = Gettext.gettext;

const Local = imports.misc.extensionUtils.getCurrentExtension();
const StringFormat = Local.imports.vendor.stringformat;
const Convenience = Local.imports.convenience;

const DefaultTemplate = "{N}-{Y}{m}{d}-{H}{M}{S}-{w}x{h}";

const parameters = ({width, height}) => {
  let now = new Date();

  let padZero = (s, n) => {
    if (String(s).length < n) {
      return padZero("0" + s, n);
    } else {
      return s;
    }
  }

  let pad = (s) => padZero(s, 2);

  return [
    [ "N", _("Screenshot"),           _("Screenshot (literal)")],
    [ "Y", now.getFullYear(),         _("Year")],
    [ "m", pad(now.getMonth()+1),     _("Month")],
    [ "d", pad(now.getDay()),         _("Day")],
    [ "H", pad(now.getHours()),       _("Hour")],
    [ "M", pad(now.getMinutes()),     _("Minute")],
    [ "S", pad(now.getSeconds()),     _("Second")],
    [ "w", width,                     _("Width")],
    [ "h", height,                    _("Height")],
  ]
}

const tooltipText = (dim) => {
  let head = ["Parameters:"];
  return parameters(dim).reduce((arr, [key, value, description]) => {
    arr.push(key + "\t" + description);
    return arr;
  }, head).join("\n")
}

const get = (template, dim, n) => {
  let vars = parameters(dim).reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});
  let basename = StringFormat.format(template, vars);
  let sequence = "";
  if (n > 0) {
    sequence = "_" + String(n);
  }
  return basename + sequence + ".png";
}
