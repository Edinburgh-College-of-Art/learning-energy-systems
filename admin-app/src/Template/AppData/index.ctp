<?= $this->element('admin-nav'); ?>

<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('New App Data'), ['action' => 'add']) ?></li>
    </ul>
</div>
<div class="appData index large-10 medium-9 columns">
    <table cellpadding="0" cellspacing="0">
    <thead>
        <tr>
            <th><?= $this->Paginator->sort('id') ?></th>
            <th><?= $this->Paginator->sort('app_students_unique_id') ?></th>
            <th><?= $this->Paginator->sort('subject') ?></th>
            <th><?= $this->Paginator->sort('light') ?></th>
            <th><?= $this->Paginator->sort('computer') ?></th>
            <th><?= $this->Paginator->sort('heater') ?></th>
            <th><?= $this->Paginator->sort('projector') ?></th>
            <th class="actions"><?= __('Actions') ?></th>
        </tr>
    </thead>
    <tbody>
    <?php foreach ($appData as $appData): ?>
        <tr>
            <td><?= $this->Number->format($appData->id) ?></td>
            <td><?= $this->Number->format($appData->app_students_unique_id) ?></td>
            <td><?= h($appData->subject) ?></td>
            <td><?= $this->Number->format($appData->light) ?></td>
            <td><?= $this->Number->format($appData->computer) ?></td>
            <td><?= $this->Number->format($appData->heater) ?></td>
            <td><?= $this->Number->format($appData->projector) ?></td>
            <td class="actions">
                <?= $this->Html->link(__('View'), ['action' => 'view', $appData->id]) ?>
                <?= $this->Html->link(__('Edit'), ['action' => 'edit', $appData->id]) ?>
                <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $appData->id], ['confirm' => __('Are you sure you want to delete # {0}?', $appData->id)]) ?>
            </td>
        </tr>

    <?php endforeach; ?>
    </tbody>
    </table>
    <div class="paginator">
        <ul class="pagination">
            <?= $this->Paginator->prev('< ' . __('previous')) ?>
            <?= $this->Paginator->numbers() ?>
            <?= $this->Paginator->next(__('next') . ' >') ?>
        </ul>
        <p><?= $this->Paginator->counter() ?></p>
    </div>
</div>
