<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('New App School'), ['action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List App Questions'), ['controller' => 'AppQuestions', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New App Question'), ['controller' => 'AppQuestions', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List App Students'), ['controller' => 'AppStudents', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New App Student'), ['controller' => 'AppStudents', 'action' => 'add']) ?></li>
    </ul>
</div>
<div class="appSchool index large-10 medium-9 columns">
    <table cellpadding="0" cellspacing="0">
    <thead>
        <tr>
            <th><?= $this->Paginator->sort('id') ?></th>
            <th><?= $this->Paginator->sort('school_name') ?></th>
            <th><?= $this->Paginator->sort('password') ?></th>
            <th class="actions"><?= __('Actions') ?></th>
        </tr>
    </thead>
    <tbody>
    <?php foreach ($appSchool as $appSchool): ?>
        <tr>
            <td><?= $this->Number->format($appSchool->id) ?></td>
            <td><?= h($appSchool->school_name) ?></td>
            <td><?= h($appSchool->password) ?></td>
            <td class="actions">
                <?= $this->Html->link(__('View'), ['action' => 'view', $appSchool->id]) ?>
                <?= $this->Html->link(__('Edit'), ['action' => 'edit', $appSchool->id]) ?>
                <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $appSchool->id], ['confirm' => __('Are you sure you want to delete # {0}?', $appSchool->id)]) ?>
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
