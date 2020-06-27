/** Meld 'extends' into a base according to ESLint rules */

export function meldExtends(config: any, extension: any): any {
  Object.keys(extension)
    .filter(key => key !== 'extends')
    .forEach(key => {

      // TODO: doesn't work for overrides
      if (Array.isArray(extension[key]))
        config[key] = Array.from(new Set([...config[key] || [], ...extension[key]]));

      // NOTE rules are melded specially
      else if (key === 'rules') {
        config['rules'] = config.rules || { };
        Object.entries(extension.rules)
          .map(([ruleName, rule]) => [ruleName, Array.isArray(rule) ? rule : [rule]] as any[])
          .forEach(([ruleName, rule]) => {
            if (!config.rules[ruleName] || (rule.length > 1))
              config.rules[ruleName] = rule;
            else config.rules[ruleName] = [rule[0], ...config.rules[ruleName].slice(1)];
          });

      } else if (typeof extension[key] === 'object')
        config[key] = Object.assign(config[key] || { }, extension[key]);

      else config[key] = extension[key];

    });

  return config;

}
