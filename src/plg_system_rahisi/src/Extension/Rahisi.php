<?php
/**
 * @package Rahisi
 * @copyright (C) 2026 Rahisi Contributors
 * @license GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace Rahisi\Plugin\System\Rahisi\Extension;

defined('_JEXEC') or die;

use Joomla\CMS\Document\HtmlDocument;
use Joomla\CMS\Event\Application\BeforeCompileHeadEvent;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\CMS\Uri\Uri;
use Joomla\Event\SubscriberInterface;

final class Rahisi extends CMSPlugin implements SubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return ['onBeforeCompileHead' => 'onBeforeCompileHead'];
    }

    public function onBeforeCompileHead(BeforeCompileHeadEvent $event): void
    {
        $app = $event->getApplication();
        $document = $event->getDocument();

        // Never affect administrator, API, feeds, or unrelated templates.
        if (!$app->isClient('site') || !($document instanceof HtmlDocument)) {
            return;
        }

        if ($app->getTemplate() !== 'rahisi') {
            return;
        }

        $assets = $document->getWebAssetManager();
        $assets->registerAndUseStyle(
            'rahisi.preferences',
            'plg_system_rahisi/preferences.css',
            ['version' => '0.1.0-alpha4']
        );
        $assets->registerAndUseScript(
            'rahisi.preferences',
            'plg_system_rahisi/preferences.js',
            ['version' => '0.1.0-alpha4'],
            ['defer' => true],
            ['core']
        );
        // Path isolates multiple Joomla installations on the same origin.
        $scale = (int) $app->getTemplate(true)->params->get('defaultScale', 100);
        $document->addScriptOptions('rahisi', [
            'storageKey' => 'rahisi:v1:' . Uri::root(true),
            'defaultScale' => in_array($scale, [100, 125, 150, 175, 200], true) ? $scale : 100,
        ]);
    }
}
