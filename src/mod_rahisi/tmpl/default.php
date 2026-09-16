<?php
/**
 * @package Rahisi
 * @copyright (C) 2026 Rahisi Contributors
 * @license GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\Language\Text;

// Escape translations too: site administrators can override language strings.
$translate = static fn (string $key): string => htmlspecialchars(Text::_($key), ENT_QUOTES, 'UTF-8');
$panelId = 'rahisi-' . (int) $module->id;
$showScale = (bool) $params->get('show_scale', 1);
$showSpacing = (bool) $params->get('show_spacing', 1);
$showContrast = (bool) $params->get('show_contrast', 1);
$showHelp = (bool) $params->get('show_help', 1);
?>
<?php if (!$available) : ?>
    <p><?php echo $translate('MOD_RAHISI_UNAVAILABLE'); ?></p>
<?php else : ?>
    <details class="rahisi-panel" data-rahisi-panel<?php echo $params->get('panel_open', 0) ? ' open' : ''; ?>>
        <summary><?php echo $translate('MOD_RAHISI_PREFERENCES'); ?></summary>
        <div class="rahisi-panel__body">
            <p><?php echo $translate('MOD_RAHISI_INTRO'); ?></p>
            <fieldset disabled data-rahisi-controls>
                <legend><?php echo $translate('MOD_RAHISI_READING'); ?></legend>
                <?php if ($showScale) : ?>
                <label for="<?php echo $panelId; ?>-scale"><?php echo $translate('MOD_RAHISI_TEXT_SIZE'); ?></label>
                <select id="<?php echo $panelId; ?>-scale" data-rahisi-scale<?php if ($showHelp) : ?> aria-describedby="<?php echo $panelId; ?>-scale-help"<?php endif; ?>>
                    <option value="100">100%</option>
                    <option value="125">125%</option>
                    <option value="150">150%</option>
                    <option value="175">175%</option>
                    <option value="200">200%</option>
                </select>
                <?php if ($showHelp) : ?>
                    <p id="<?php echo $panelId; ?>-scale-help" class="rahisi-panel__help"><?php echo $translate('MOD_RAHISI_SCALE_HELP'); ?></p>
                <?php endif; ?>
                <?php endif; ?>
                <?php if ($showSpacing) : ?>
                <label class="rahisi-panel__check">
                    <input type="checkbox" data-rahisi-spacing<?php if ($showHelp) : ?> aria-describedby="<?php echo $panelId; ?>-spacing-help"<?php endif; ?>>
                    <span><?php echo $translate('MOD_RAHISI_SPACING'); ?></span>
                </label>
                <?php if ($showHelp) : ?>
                    <p id="<?php echo $panelId; ?>-spacing-help" class="rahisi-panel__help"><?php echo $translate('MOD_RAHISI_SPACING_HELP'); ?></p>
                <?php endif; ?>
                <?php endif; ?>
                <?php if ($showContrast) : ?>
                <label class="rahisi-panel__check">
                    <input type="checkbox" data-rahisi-contrast<?php if ($showHelp) : ?> aria-describedby="<?php echo $panelId; ?>-contrast-help"<?php endif; ?>>
                    <span><?php echo $translate('MOD_RAHISI_CONTRAST'); ?></span>
                </label>
                <?php if ($showHelp) : ?>
                    <p id="<?php echo $panelId; ?>-contrast-help" class="rahisi-panel__help"><?php echo $translate('MOD_RAHISI_CONTRAST_HELP'); ?></p>
                <?php endif; ?>
                <?php endif; ?>
                <button type="button" data-rahisi-reset<?php if ($showHelp) : ?> aria-describedby="<?php echo $panelId; ?>-reset-help"<?php endif; ?>><?php echo $translate('MOD_RAHISI_RESET'); ?></button>
                <?php if ($showHelp) : ?>
                    <p id="<?php echo $panelId; ?>-reset-help" class="rahisi-panel__help"><?php echo $translate('MOD_RAHISI_RESET_HELP'); ?></p>
                <?php endif; ?>
            </fieldset>
            <p class="rahisi-panel__status" role="status" aria-live="polite" aria-atomic="true"
                data-rahisi-status
                data-saved="<?php echo $translate('MOD_RAHISI_SAVED'); ?>"
                data-session="<?php echo $translate('MOD_RAHISI_SESSION'); ?>"
                data-reset="<?php echo $translate('MOD_RAHISI_RESET_DONE'); ?>"
            ></p>
            <noscript><p><?php echo $translate('MOD_RAHISI_NOSCRIPT'); ?></p></noscript>
        </div>
    </details>
<?php endif; ?>
