import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import ruby from 'highlight.js/lib/languages/ruby';
import swift from 'highlight.js/lib/languages/swift';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';
import kotlin from 'highlight.js/lib/languages/kotlin';
import php from 'highlight.js/lib/languages/php';
import shell from 'highlight.js/lib/languages/shell';
import json from 'highlight.js/lib/languages/json';
import yaml from 'highlight.js/lib/languages/yaml';
import sql from 'highlight.js/lib/languages/sql';
import markdown from 'highlight.js/lib/languages/markdown';
import powershell from 'highlight.js/lib/languages/powershell';
import command from 'highlight.js/lib/languages/nginx';
import ini from 'highlight.js/lib/languages/ini';
import http from 'highlight.js/lib/languages/http';
import r from 'highlight.js/lib/languages/r';
import bash from 'highlight.js/lib/languages/bash';

const hljsLanguages: Record<string, any> = {
  command,
  javascript,
  json,
  python,
  java,
  php,
  bash,
  shell,
  typescript,
  css,
  c,
  cpp,
  ruby,
  swift,
  go,
  rust,
  kotlin,
  xml,
  yaml,
  sql,
  markdown,
  powershell,
  ini,
  http,
  r,
};

export default hljsLanguages