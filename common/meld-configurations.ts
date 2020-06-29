/** Meld 'extends' into a base according to ESLint rules */

export function meldConfigurations(config: any, extension: any): any {
  Object.keys(extension)
    .filter(key => key !== 'extends')
    // NOTE: we don't try to meld 'files' as these are the keys to overrides
    .filter(key => key !== 'files')
    .forEach(key => {
      if (key === 'overrides')
        meldConfigurationsOverrides(config, extension);
      else if (key === 'plugins')
        meldConfigurationsPlugins(config, extension);
      else if (key === 'rules')
        meldConfigurationsRules(config, extension);
      else if (Array.isArray(extension[key]))
        config[key] = Array.from(new Set([...config[key] || [], ...extension[key]]));
      else if (typeof extension[key] === 'object')
        config[key] = Object.assign(config[key] || { }, extension[key]);
      else config[key] = extension[key];
    });

  return config;

}

// NOTE: works for overrides.files, but not generally
function arraysEqual(p: any[], q: any[]): boolean {
  return p.slice(0).sort().toString() === q.slice(0).sort().toString();
}

// slow but sure
function deepCopy(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

// TODO: what about overrides of overrides ???
export function meldConfigurationsOverrides(config: any, extension: any): void {
  if (!config['overrides'])
    config['overrides'] = [...extension.overrides];
  else {
    extension.overrides.forEach(extOverride => {
      const cfgOverride = config.overrides.find(override => arraysEqual(override.files, extOverride.files));
      if (cfgOverride)
        meldConfigurations(cfgOverride, extOverride);
      else config.overrides.push(deepCopy(extOverride));
    });
  }
}

// NOTE: plugins need to be deduplicated
export function meldConfigurationsPlugins(config: any, extension: any): void {
  config['plugins'] = Array.from(new Set([...config.plugins || [], ...extension.plugins]));
}

// NOTE: rules can override onky the level, leaving other settings intact
// @see https://eslint.org/docs/user-guide/configuring
export function meldConfigurationsRules(config: any, extension: any): void {
  config['rules'] = config.rules || { };
  Object.entries(extension.rules)
    .map(([ruleName, rule]) => [ruleName, Array.isArray(rule) ? rule : [rule]] as any[])
    .forEach(([ruleName, extRule]) => {
      // normalize rules into arrays
      if (!Array.isArray(extRule))
        extRule = [extRule];
      if (!config.rules[ruleName] || (extRule.length > 1))
        config.rules[ruleName] = extRule;
      else {
        let cfgRule = config.rules[ruleName];
        if (!Array.isArray(cfgRule))
          cfgRule = [cfgRule];
        config.rules[ruleName] = [extRule[0], ...cfgRule.slice(1)];
      }
    });
}
