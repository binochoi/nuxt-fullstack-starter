/**
 * primevue가 nuxt4를 지원하지 않는 문제 해결
 * https://github.com/primefaces/primevue/issues/7928
 */
import fs from 'node:fs';
import path from 'node:path';

const moduleMjsPath = path.resolve(
  process.cwd(),
  'node_modules/@primevue/nuxt-module/dist/module.mjs'
);

let content = fs.readFileSync(moduleMjsPath, 'utf-8');

// nuxt: "^3.0.0" → nuxt: "^4.0.0"로 변경
const replaced = content.replace(/nuxt:\s*"\^3\.0\.0"/, 'nuxt: "^4.0.0"');

if (content !== replaced) {
  fs.writeFileSync(moduleMjsPath, replaced, 'utf-8');
  console.log('nuxt 호환성 버전을 ^4.0.0으로 변경했습니다.');
} else {
  console.log('변경할 내용이 없습니다.');
}
