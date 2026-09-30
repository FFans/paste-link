<?php

/*
 * This file is part of ffans/paste-link.
 *
 * Copyright (c) 2026 .
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FFans\PasteLink;

use Flarum\Extend;

return [
    // Assets
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),
    new Extend\Locales(__DIR__ . '/locale'),
];
